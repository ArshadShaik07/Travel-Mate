import { Hotel } from "../models/hotels.model.js";

const showHotels = async (req, res) => {
	let { city, sortParam, sortOrder, skip, limit } = req.query;
	let query = {};
	city = city?.trim();
	sortParam = sortParam?.trim();
	sortOrder = sortOrder?.trim();
	let sorting = {};
	if (sortParam && sortOrder) sorting[sortParam] = Number(sortOrder);
	if (city) query.city = city;
	const hotels = await Hotel.find(query)
		.sort(sorting)
		.skip(skip)
		.limit(limit);
	res.status(200).json(hotels);
};

const getHotelById = async (req, res) => {
	const id = req.params.id;
	const hotel = await Hotel.findById(id);
	if (!hotel) {
		res.status(404);
		throw Error("no hotel found!");
	}
	res.status(200).json(hotel);
};

export { showHotels, getHotelById };
