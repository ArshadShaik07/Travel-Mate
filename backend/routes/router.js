import express from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	renewToken,
	getMyProfile,
	updateMyProfile,
} from "../controllers/userController.js";
import {
	getMybookings,
	postBooking,
	delMybooking,
} from "../controllers/myBookings.js";
import { authUser } from "../middleware/authUser.js";
import { showFlights, getFlightById } from "../controllers/flightsData.js";
import { showHotels, getHotelById } from "../controllers/hotelsData.js";
const router = express.Router();

//register user
router.post("/register", registerUser);

//login user
router.post("/login", loginUser);

//renew token
router.get("/token", renewToken);

//logout user
router.post("/logout", logoutUser);

//show my bookings
router.get("/mybookings", authUser, getMybookings);

//add a booking
router.post("/bookings", authUser, postBooking);

//delete a booking
router.delete("/bookings/:id", authUser, delMybooking);

//show flights
router.get("/flights", showFlights);

//choose flight by id
router.get("/flights/:id", getFlightById);

//show hotels
router.get("/hotels", showHotels);

//chooose hotel by id
router.get("/hotels/:id", getHotelById);

//get my profile
router.get("/me", authUser, getMyProfile);

//update my profile
router.patch("/me", authUser, updateMyProfile);

export default router;
