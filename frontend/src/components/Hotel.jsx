import { useNavigate } from "react-router-dom";

function Hotel({ hotel }) {
	const navigate = useNavigate();

	return (
		<div
			className="w-full max-w-lg bg-white rounded-xl shadow p-4 flex flex-col gap-4 hover:scale-[1.02] transition "
			onClick={() => navigate(`/hotels/${hotel._id}`)}
		>
			<div className="w-full h-48 overflow-hidden rounded-lg">
				<img
					src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex flex-row justify-between items-start">
				{/* Left sub-column */}
				<div className="flex flex-col">
					<p className="text-gray-800 text-xl font-semibold capitalize">
						{hotel.city}
					</p>
					<p className="text-sm font-semibold text-gray-700">
						{hotel.name}
					</p>
				</div>

				{/* Right sub-column */}
				<div className="flex flex-col text-right">
					<p className="text-sm font-medium text-gray-800">
						₹{hotel.pricePerNight}
					</p>
					<p className="text-sm text-gray-600">
						{hotel.roomsAvailable} rooms available
					</p>
				</div>
			</div>

			{/* Book Now Button */}
			<button
				className="w-full py-2 bg-[rgb(239,71,111)] text-white rounded-lg font-semibold 
                   hover:bg-[rgb(207,62,96)] active:scale-95 transition"
			>
				Book Now
			</button>
		</div>
	);
}

export default Hotel;
