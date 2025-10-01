import jwt from "jsonwebtoken";
import { Booking } from "../models/bookings.model.js";

const getMybookings = async (req, res) => {
    const bookings = await Booking.find({ userId: req.user.id })
        .populate("userId", "-password")
        .populate("itemId");
    if (!bookings)
        return res.status(200).json({ message: "no bookings found" });
    res.status(200).json(bookings);
};

const postBooking = async (req, res) => {
    const { type, itemId, price, date } = req.body;
    if (!itemId) throw Error("item id invalid");
    if (!["flight", "hotel"].includes(type)) throw Error("type unavailable");

    const booking = await Booking.create({
        userId: req.user.id,
        type,
        itemId,
        date: date,
        price,
    });

    res.status(201).json({ message: booking });
};

const delMybooking = async (req, res) => {
    const { itemId } = req.body;
    if (!itemId) throw Error("invalid item id!");

    const book = await Booking.deleteOne({ itemId });
    res.status(200).json({ message: "deleted succesfully!" });
};

function authUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw Error("Unauthorised");
    const accessToken = authHeader.split(" ")[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403);
            throw Error("forbidden page!");
        }
        req.user = user;
    });
    next();
}

export { getMybookings, postBooking, authUser, delMybooking };
