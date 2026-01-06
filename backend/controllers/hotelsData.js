import { Hotel } from "../models/hotels.model.js";

const showHotels = async (req, res) => {
	const { city, sortOrder } = req.query;
	let hotels;
	if (!city) {
		if (!sortOrder) {
			const hotels = await Hotel.find({});
			return res.status(200).json(hotels);
		} else {
			const hotels = await Hotel.find({}).sort(sortOrder);
			return res.status(200).json(hotels);
		}
	} else {
		if (sortOrder) {
			hotels = await Hotel.find({ city })
				.sort({ pricePerNight: 1 })
				.sort(sortOrder);
		} else {
			hotels = await Hotel.find({ city }).sort({ pricePerNight: 1 });
		}
	}
	if (hotels.length === 0) {
		res.status(404);
		throw Error("no hotels available");
	} else {
		res.status(200).json(hotels);
	}
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
