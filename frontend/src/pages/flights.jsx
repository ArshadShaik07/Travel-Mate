import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Flight from "../components/flight.jsx";

function Flights() {
	const { fetchFlights, flights } = useContext(AuthContext);
	const limit = 5;
	const [skip, setSkip] = useState(0);
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [date, setDate] = useState("");
	const [sortParam, setSortParam] = useState("price");
	const [sortOrder, setSortOrder] = useState(1);

	useEffect(() => {
		fetchFlights({ from, to, date, sortParam, sortOrder, limit, skip });
	}, [skip]);

	return (
		<div className="flex flex-col min-h-screen items-center bg-[#F8FAFC] py-32 px-4 sm:px-6">
			<div className="text-center space-y-3 mb-12">
				<h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
					Search{" "}
					<span className="text-[rgb(6,214,160)]">Flights</span>
				</h1>
				<p className="text-gray-500 font-medium text-lg">
					Find the quickest routes for your next journey
				</p>
			</div>

			<div className="w-full max-w-5xl bg-white p-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 mb-8">
				<div className="flex flex-col lg:flex-row items-center gap-4">
					<div className="relative w-full">
						<span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
							🛫
						</span>
						<input
							value={from}
							onChange={(e) => setFrom(e.target.value)}
							className="w-full bg-gray-50 border-2 border-transparent px-14 py-4 rounded-2xl focus:outline-none focus:bg-white focus:border-[rgb(6,214,160)] transition-all font-bold text-gray-700"
							placeholder="From where?"
						/>
					</div>

					<div className="hidden lg:block text-gray-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</div>

					<div className="relative w-full">
						<span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
							🛬
						</span>
						<input
							value={to}
							onChange={(e) => setTo(e.target.value)}
							onKeyDown={(e) => {
								if (
									e.key === "Enter" &&
									from.length !== 0 &&
									to.length !== 0
								) {
									setSkip(0);
									fetchFlights({ from, to, limit, skip: 0 });
								}
							}}
							className="w-full bg-gray-50 border-2 border-transparent px-14 py-4 rounded-2xl focus:outline-none focus:bg-white focus:border-[rgb(6,214,160)] transition-all font-bold text-gray-700"
							placeholder="To where?"
						/>
					</div>

					<input
						type="date"
						onChange={(e) => setDate(e.target.value)}
						className="w-full lg:w-auto bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:outline-none focus:bg-white focus:border-[rgb(6,214,160)] transition-all font-bold text-gray-700 cursor-pointer"
					/>

					<button
						onClick={() => {
							setSkip(0);
							fetchFlights({
								from,
								to,
								date,
								sortParam,
								sortOrder,
								limit,
								skip: 0,
							});
						}}
						className="w-full lg:w-auto px-12 py-4 rounded-2xl bg-[rgb(6,214,160)] text-white font-black text-lg shadow-lg shadow-emerald-100 hover:bg-[rgb(4,180,135)] hover:-translate-y-0.5 active:scale-95 transition-all"
					>
						Search
					</button>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-y-0.5 md:gap-2">
				<button
					onClick={() => {
						fetchFlights({ limit, skip: 0 });
						setFrom("");
						setTo("");
					}}
					className="mb-1 md:mb-10 px-8 py-3 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
				>
					Show all available flights
				</button>
				<select
					value={sortParam}
					onChange={(e) => setSortParam(e.target.value)}
					className="mb-1 md:mb-10 p-3 rounded-md bg-white border border-gray-200 text-sm md:text-md font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm "
				>
					<option value="default">Sort by</option>
					<option value="price">price</option>
					<option value="date">date</option>
				</select>
				<select
					value={sortOrder}
					onChange={(e) => setSortOrder(Number(e.target.value))}
					className="mb-10 p-3 rounded-md bg-white border border-gray-200 text-sm md:text-md font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm "
				>
					<option value="sort in">sort type</option>
					<option value="1">Low to high</option>
					<option value="-1">High to low</option>
				</select>
			</div>

			<div className="min-w-screen max-w-4xl flex flex-col m-10 gap-6 ">
				{flights.length > 0 ? (
					flights.map((flight) => (
						<div
							key={flight._id}
							className="w-auto flex justify-center"
						>
							<Flight flight={flight} />
						</div>
					))
				) : (
					<div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 shadow-sm">
						<span className="text-5xl mb-4 block">☁️</span>
						<p className="text-gray-400 font-bold text-xl">
							No flights found for this route.
						</p>
						<button
							onClick={() => fetchFlights({ limit, skip: 0 })}
							className="mt-4 text-[rgb(6,214,160)] font-bold hover:underline"
						>
							Reset Search
						</button>
					</div>
				)}
			</div>
			<button
				onClick={() => {
					setSkip((prevSkip) => prevSkip + 5);
				}}
				className="px-8 py-3 bg-[rgb(6,214,160)] hover:bg-[rgb(4,160,118)] text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition-all duration-150 active:scale-95"
			>
				Show more
			</button>
		</div>
	);
}

export default Flights;
