import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Flight from "../components/flight.jsx";

function Flights() {
	const { fetchFlights, flights } = useContext(AuthContext);
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		fetchFlights();
	}, []);

	return (
		<div className="flex flex-col min-h-[calc(100vh-64px)] items-center gap-8 p-6 bg-gray-50 relative">
			<p className="text-5xl font-semibold text-gray-800 tracking-tight">
				Flights
			</p>

			{/* Search Inputs */}
			<div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-3xl bg-white p-4 rounded-xl shadow">
				<input
					value={from}
					onChange={(e) => setFrom(e.target.value)}
					className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm
             focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] focus:border-[rgb(6,214,160)] transition"
					placeholder="From city"
				/>

				<input
					value={to}
					onChange={(e) => setTo(e.target.value)}
					onKeyDown={(e) => {
						if (
							e.key === "Enter" &&
							from.length !== 0 &&
							to.length !== 0
						) {
							fetchFlights(from, to, "");
							setFrom("");
							setTo("");
						}
					}}
					className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm
             focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] focus:border-[rgb(6,214,160)] transition"
					placeholder="To city"
				/>

				<input
					type="date"
					onChange={(e) => setDate(e.target.value)}
					className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-[rgb(6,214,160)] focus:border-[rgb(6,214,160)] transition"
				/>

				<button
					onClick={() => {
						if (from.length !== 0 && to.length !== 0) {
							fetchFlights(from, to, date);
						} else {
							alert("Some fields are empty");
						}
						setFrom("");
						setTo("");
					}}
					className="px-6 py-2 rounded-lg bg-[rgb(6,214,160)] text-white font-semibold shadow 
             hover:bg-[rgb(4,180,135)] active:scale-95 transition"
				>
					Search
				</button>
			</div>

			{/* All Flights Link */}
			<p
				className="text-lg font-medium text-gray-700 underline cursor-pointer hover:text-gray-900 transition"
				onClick={() => fetchFlights()}
			>
				All flights
			</p>

			{/* Flights List */}
			<div className="w-full max-w-5xl flex flex-col items-center gap-6 mt-4">
				{flights.map((flight) => (
					<Flight flight={flight} key={flight._id} />
				))}
			</div>
		</div>
	);
}

export default Flights;
