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
        throw Error("email doesnt exist,check your email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.status(404);
        throw Error("email id and password dont match!");
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
    const token = authHeader.split(" ")[1];
    refreshTokens = refreshTokens.filter((t) => t !== token);
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

export { registerUser, loginUser, renewToken, logoutUser };
