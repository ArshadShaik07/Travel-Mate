import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

let refreshTokens = [];

const registerUser = async (req, res) => {
	if (!req.body) {
		throw Error("enter details correctly");
	}

	const { username, password, email } = req.body;
	if (!(username && email && password)) {
		res.status(400);
		throw Error("enter the details correctly");
	}
	const userNameExists = await User.findOne({ username: username });
	const emailExists = await User.findOne({ email: email });
	if (userNameExists) {
		res.json({ message: "username already exists" });
	} else if (emailExists) {
		res.json({ message: "email already exists" });
	} else {
		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		await User.create({
			username,
			email,
			password: hashedPassword,
		});
		res.status(200).json({ message: `${username} registered succesfully` });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	if (!(email && password)) {
		throw Error("add details correctly");
	}
	const user = await User.findOne({ email: email });
	if (!user) {
		res.status(404);
		throw Error("email doesn't exist,check your email");
	}
	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		res.status(404);
		throw Error("email id and password don't match!");
	}

	const accessToken = jwt.sign(
		{ id: user._id.toString(), username: user.username },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "10m",
		}
	);

	const refreshToken = jwt.sign(
		{ id: user._id.toString(), username: user.username },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "7d" }
	);

	refreshTokens.push(refreshToken);

	res.status(200).json({
		message: "logged in succesfully",
		accessToken,
		refreshToken,
	});
};

const logoutUser = async (req, res) => {
	const authHeader = req.headers["authorization"];
	const refreshToken = authHeader.split(" ")[1];
	refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
	res.status(200).json({ message: "logged out succesfully" });
};

const renewToken = async (req, res) => {
	const authHeader = req.headers["authorization"];
	if (!authHeader) throw Error("unauthorised!");
	const refreshToken = authHeader.split(" ")[1];
	let newAccessToken = null;
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			res.status(403);
			throw Error("access unauthorised!");
		}
		newAccessToken = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "10m" }
		);
	});
	res.json({ accessToken: newAccessToken });
};

const getMyProfile = async (req, res) => {
	const id = req.user.id;
	const user = await User.findById(id).select("-password");
	res.status(200).json(user);
};

const updateMyProfile = async (req, res) => {
	const id = req.user.id;
	const updates = { ...req.body };

	delete updates.password;
	delete updates._id;
	delete updates._createdAt;

	if (updates.email) {
		const email = updates.email.toLowerCase().trim();
		const exists = await User.findOne({ email });
		if (exists) {
			return res.status(400).json("email already exists!");
		} else {
			updates.email = email;
		}
	}
	if (updates.username) {
		const username = updates.username.trim();
		const exists = await User.findOne({ username });
		if (exists) {
			return res.status(400).json("username already exists!");
		} else {
			updates.username = username;
		}
	}

	const updatedUser = await User.findByIdAndUpdate(id, updates, {
		new: true,
	}).select("-password");

	res.status(200).json(updatedUser);
};

export {
	registerUser,
	loginUser,
	renewToken,
	logoutUser,
	getMyProfile,
	updateMyProfile,
};
