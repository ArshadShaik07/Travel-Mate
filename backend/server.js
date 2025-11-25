import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Routes from "./routes/router.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { Booking } from "./models/bookings.model.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
app.use(cookieParser());
const port = process.env.PORT || 8000;
const password = process.env.PASSWORD;
app.use("/api", Routes);

app.use(errorHandler);

mongoose
	.connect(
		`mongodb+srv://arshadshaik2007:${password}@cluster0.73udxbh.mongodb.net/travelApp?retryWrites=true&w=majority&appName=Cluster0`
	)
	.then(async () => {
		console.log("connected to mongodb successfully");
		app.listen(port, async () => {
			console.log(`connected to port ${port} successfully`);
		});
	})
	.catch((e) => {
		console.log(e);
	});
