import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

function HotelDetails() {
	const { id } = useParams();
	const { fetchHotelById } = useContext(AuthContext);
	const [hotelData, setHotelData] = useState({});

	useEffect(() => {
		async function abc() {
			setHotelData(await fetchHotelById(id));
		}
		abc();
	}, []);
	console.log(hotelData);

	return (
		<div className="min-h-screen w-full flex justify-center items-center p-6">
			<div
				className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6 flex flex-col gap-6"
				style={{
					backgroundImage:
						"url('https://plus.unsplash.com/premium_vector-1724302612226-05cd23f5c8f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D')",
				}}
			>
				{/* Hotel Name */}
				<p className="text-3xl font-bold text-gray-900">
					{hotelData.name}
				</p>

				{/* City */}
				<p className="text-lg text-gray-800 capitalize">
					📍 {hotelData.city}
				</p>

				{/* Divider */}
				<div className="border-b border-gray-300"></div>

				{/* Price + Rooms */}
				<div className="flex justify-between items-center">
					<div>
						<p className="text-gray-600 text-sm">Price per night</p>
						<p className="text-2xl font-semibold text-gray-900">
							₹{hotelData.pricePerNight}
						</p>
					</div>

					<div className="text-right">
						<p className="text-gray-600 text-sm">Rooms available</p>
						<p className="text-xl font-semibold text-gray-800">
							{hotelData.roomsAvailable}
						</p>
					</div>
				</div>

				{/* Book Button */}
				<button
					className="w-full py-3 bg-[rgb(6,214,160)] text-white font-semibold rounded-lg shadow 
                         hover:bg-[rgb(4,180,135)] transition active:scale-98"
				>
					Book This Hotel
				</button>
			</div>
		</div>
	);
}

export default HotelDetails;
