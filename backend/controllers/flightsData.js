import { Flight } from "../models/flights.model.js";

const showFlights = async (req, res) => {
	const { from, to, date } = req.query;
	if (from.length === 0 && to.length === 0 && date.length === 0) {
		const flights = await Flight.find({});
		return res.status(200).send(flights);
	} else if (from.length !== 0 && to.length !== 0 && date.length === 0) {
		const flights = await Flight.find({ from, to });
		if (flights.length === 0) {
			res.status(404);
			throw Error("no fligths found!");
		} else {
			return res.status(200).json(flights);
		}
	}
	const flights = await Flight.find({ from, to, date });
	console.log(flights);
	if (flights.length === 0) {
		res.status(404);
		throw Error("no flights found!");
	} else {
		res.status(200).json(flights);
	}
};

const getFlightById = async (req, res) => {
	const id = req.params.id;
	const flight = await Flight.findById(id);
	if (!flight) {
		res.statsu(404);
		throw Error("no flight found!");
	}
	res.status(200).json(flight);
};

export { showFlights, getFlightById };
