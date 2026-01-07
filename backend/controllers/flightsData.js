import { Flight } from "../models/flights.model.js";

const showFlights = async (req, res) => {
	let { from, to, date, sortParam, sortOrder } = req.query;
	from = from?.trim();
	to = to?.trim();
	date = date?.trim();
	sortParam = sortParam?.trim();
	sortOrder = sortOrder?.trim();

	let query = {};
	if (from) query.from = from;
	if (to) query.to = to;
	if (date) query.date = date;
	let sorting = {};
	if (sortParam && sortOrder) sorting[sortParam] = Number(sortOrder);
	console.log(query, sorting);

	res.status(200).json(await Flight.find(query).sort(sorting));
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
