import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Hotel from "../components/Hotel.jsx";

function Hotels() {
	const { fetchHotels, hotels } = useContext(AuthContext);
	const [city, setCity] = useState("");
	const [sortParam, setSortParam] = useState("pricePerNight");
	const [sortOrder, setSortOrder] = useState(1);
	const limit = 5;
	const [skip, setSkip] = useState(0);

	useEffect(() => {
		fetchHotels({ city, sortParam, sortOrder, limit, skip });
	}, [skip]);

	return (
		<div className="flex flex-col min-h-screen items-center bg-slate-50 pt-32 px-4 sm:px-6 mb-10">
			<div className="text-center space-y-3 mb-10">
				<h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
					Find your <span className="text-blue-600">Stay</span>
				</h1>
				<p className="text-slate-500 font-medium text-lg italic">
					"Collect moments, not things."
				</p>
			</div>

			{/* Search Bar: White with Blue focus */}
			<div className="w-full max-w-2xl bg-white p-3 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-slate-200 mb-8">
				<div className="flex flex-col sm:flex-row items-center gap-3">
					<div className="relative w-full">
						<span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-60">
							📍
						</span>
						<input
							value={city}
							onChange={(e) => setCity(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									fetchHotels({ city, limit, skip: 0 });
								}
							}}
							className="w-full bg-slate-50 border-2 border-transparent px-14 py-4 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-700 placeholder:text-slate-400"
							placeholder="Search by city (e.g. London)"
						/>
					</div>

					<button
						onClick={() => {
							setSkip(0);
							fetchHotels({
								city,
								sortParam,
								sortOrder,
								skip: 0,
								limit,
							});
						}}
						className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg"
					>
						Search
					</button>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-1">
				<button
					onClick={() => {
						setSkip(0);
						fetchHotels({ limit, skip: 0 });
						setCity("");
					}}
					className="mb-1 md:mb-10 px-6 py-2 rounded-full text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all border border-blue-500"
				>
					View all properties
				</button>
				<select
					value={sortParam}
					onChange={(e) => setSortParam(e.target.value)}
					className="mb-1 md:mb-10 p-3 rounded-md bg-white border border-gray-200 text-sm md:text-md font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm "
				>
					<option value="default">Sort by</option>
					<option value="pricePerNight">price</option>
					<option value="roomsAvailable">rooms availability</option>
				</select>
				<select
					value={sortOrder}
					onChange={(e) => setSortOrder(e.target.value)}
					className="mb-10 p-3 rounded-md bg-white border border-gray-200 text-sm md:text-md font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm "
				>
					<option value="default">sort type</option>
					<option value="1">Low to high</option>
					<option value="-1">High to low</option>
				</select>
			</div>

			<div className="w-full max-w-5xl flex flex-col gap-8 mb-24 items-center">
				{hotels.length > 0 ? (
					hotels.map((hotel) => (
						<div
							key={hotel._id}
							className="w-full flex justify-center hover:scale-[1.01] transition-all duration-300"
						>
							<Hotel hotel={hotel} />
						</div>
					))
				) : (
					<div className="w-full text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
						<p className="text-slate-400 font-bold text-xl">
							We couldn't find any hotels there.
						</p>
					</div>
				)}
			</div>
			<button
				onClick={() => {
					setSkip((prevSkip) => prevSkip + 5);
				}}
				className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 active:scale-95"
			>
				Show more
			</button>
		</div>
	);
}

export default Hotels;
