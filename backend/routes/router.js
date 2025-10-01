import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    renewToken,
} from "../controllers/userController.js";
import {
    getMybookings,
    postBooking,
    authUser,
    delMybooking,
} from "../controllers/myBookings.js";
import { showFlights } from "../controllers/flightsData.js";
import { showHotels } from "../controllers/hotelsData.js";
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
router.delete("/mybookings", authUser, delMybooking);

//show flights
router.get("/flights", showFlights);

//show hotels
router.get("/hotels", showHotels);

export default router;
