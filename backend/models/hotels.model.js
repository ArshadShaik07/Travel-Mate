import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: String,
    city: String,
    pricePerNight: Number,
    roomsAvailable: Number,
});

const Hotel = mongoose.model("hotel", hotelSchema);

export { Hotel };
