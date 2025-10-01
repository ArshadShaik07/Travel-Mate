import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["flight", "hotel"],
        required: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "type",
    },
    date: {
        type: String,
    },
    price: {
        type: Number,
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

export { Booking };
