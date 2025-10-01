import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
    airline: String,
    from: String,
    to: String,
    date: String,
    price: Number,
});

const Flight = mongoose.model("flight", flightSchema);

export { Flight };
