import { useNavigate } from "react-router-dom";

function Flight({ flight }) {
	const navigate = useNavigate();
	return (
		<div
			className="w-full max-w-3xl bg-white shadow-md rounded-xl p-4 flex flex-col gap-3 hover:shadow-lg transition"
			onClick={() => navigate(`/flights/${flight._id}`)}
		>
			{/* Image */}
			<div className="w-full h-40 overflow-hidden rounded-lg">
				<img
					src="https://plus.unsplash.com/premium_vector-1718387200528-d786c6e7d820?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D"
					alt="flight illustration"
					className="w-full h-full object-cover object-center"
				/>
			</div>

			{/* Airline */}
			<p className="text-xl font-semibold text-gray-800">
				{flight.airline}
			</p>

			{/* Route */}
			<div className="flex justify-between items-center">
				<div className="flex flex-col">
					<p className="text-gray-600 text-sm">From</p>
					<p className="text-lg font-medium text-gray-900 capitalize">
						{flight.from}
					</p>
				</div>

				<p className="text-3xl font-light text-gray-500">→</p>

				<div className="flex flex-col text-right">
					<p className="text-gray-600 text-sm">To</p>
					<p className="text-lg font-medium text-gray-900 capitalize">
						{flight.to}
					</p>
				</div>
			</div>

			{/* Date + Price */}
			<div className="flex justify-between items-center">
				<p className="text-sm text-gray-600">{flight.date}</p>
				<p className="text-lg font-semibold text-gray-800">
					₹{flight.price}
				</p>
			</div>
		</div>
	);
}

export default Flight;
