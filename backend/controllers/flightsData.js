import { Flight } from "../models/flights.model.js";

const showFlights = async (req, res) => {
    const { from, to } = req.query;
    if (!(from && to)) {
        const flights = await Flight.find({});
        return res.status(200).send(flights);
    }
    const flights = await Flight.find({ from, to });
    if (flights.length === 0) {
        res.status(404);
        throw Error("no flights found!");
    }
    res.status(200).json(flights);
};

export { showFlights };
