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
		res.status(400);
		throw Error("username already exists");
	} else if (emailExists) {
		res.status(400);
		throw Error("email already exists");
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
		{ expiresIn: "15d" }
	);

	refreshTokens.push(refreshToken);

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
		maxAge: 15 * 24 * 60 * 60 * 1000,
	});

	res.status(200).json({
		message: "logged in succesfully",
		accessToken,
	});
};

const logoutUser = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	console.log(refreshToken);
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
	});
	refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
	res.status(200).json({ message: "logged out succesfully" });
};

const renewToken = async (req, res, next) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		const error = new Error("No refresh token!");
		error.status = 401;
		return next(error);
	}
	let newAccessToken = null;
	try {
		const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		newAccessToken = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "10m" }
		);
		return res.json({ accessToken: newAccessToken });
	} catch (e) {
		const error = new Error("Invalid or expired refresh token!");
		error.status = 401;
		return next(error);
	}
};

const getMyProfile = async (req, res, next) => {
	const id = req.user.id;
	const user = await User.findById(id).select("-password");
	res.status(200).json(user);
};

const updateMyProfile = async (req, res, next) => {
	const id = req.user.id;
	const updates = { ...req.body };

	delete updates._id;
	delete updates._createdAt;
	console.log(updates.password);

	if (updates.email && updates.email.length !== 0) {
		const email = updates.email.toLowerCase().trim();
		const exists = await User.findOne({ email });
		if (exists) {
			const err = new Error("email already exists!");
			err.status = 400;
			return next(err);
		} else {
			updates.email = email;
		}
	}
	if (updates.username && updates.username.length !== 0) {
		const username = updates.username.trim();
		const exists = await User.findOne({ username });
		if (exists && String(exists._id) !== String(id)) {
			const error = new Error("username already exists!");
			error.status = 400;
			return next(error);
		} else {
			updates.username = username;
		}
	}
	if (updates.password && updates.password.length !== 0) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(updates.password, salt);
		updates.password = hashedPassword;
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
