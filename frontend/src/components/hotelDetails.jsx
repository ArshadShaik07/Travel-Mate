import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

function HotelDetails() {
	const { id } = useParams();
	const { fetchHotelById, bookHotel, loggedIn } = useContext(AuthContext);
	const [hotelData, setHotelData] = useState({});
	const [date, setDate] = useState("");
	const [booked, setBooked] = useState(false);

	useEffect(() => {
		async function abc() {
			setHotelData(await fetchHotelById(id));
		}
		abc();
	}, [id]);

	return (
		<div className="min-h-screen w-full bg-slate-50 flex justify-center items-center p-3 sm:p-6 pt-24 sm:pt-32">
			<div className="w-full max-w-4xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-slate-100">
				<div className="flex flex-col lg:flex-row">
					{/* Image Section: Height scales based on screen size */}
					<div className="relative lg:w-1/2 h-56 sm:h-72 lg:h-auto overflow-hidden">
						<img
							src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop"
							className="w-full h-full object-cover"
							alt="Hotel view"
						/>
						{/* Overlay Gradient */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/10"></div>

						{/* Mobile Header (Visible only on small screens) */}
						<div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-6 lg:hidden">
							<h1 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
								{hotelData.name}
							</h1>
							<p className="text-white/80 font-bold uppercase text-[10px] sm:text-xs tracking-widest mt-1 italic">
								📍 {hotelData.city}
							</p>
						</div>
					</div>

					{/* Content Section */}
					<div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
						{/* Desktop Header (Hidden on mobile) */}
						<div className="hidden lg:block mb-8">
							<span className="text-blue-600 font-black uppercase text-[10px] tracking-[0.2em]">
								Premium Stay
							</span>
							<h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2 capitalize leading-tight">
								{hotelData.name}
							</h1>
							<p className="text-slate-400 font-bold mt-2 flex items-center gap-1">
								<span className="text-sm">📍</span>{" "}
								{hotelData.city}, India
							</p>
						</div>

						{/* Responsive Info Grid */}
						<div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-10">
							<div className="space-y-0.5 sm:space-y-1 border-l-2 border-slate-100 pl-3 sm:pl-4">
								<p className="text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">
									Nightly Rate
								</p>
								<p className="text-xl sm:text-3xl font-black text-slate-900">
									₹{hotelData.pricePerNight}
									<span className="text-[10px] sm:text-sm text-slate-400 font-medium">
										/nt
									</span>
								</p>
							</div>
							<div className="space-y-0.5 sm:space-y-1 border-l-2 border-slate-100 pl-3 sm:pl-4">
								<p className="text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">
									Status
								</p>
								<p className="text-xl sm:text-3xl font-black text-slate-900">
									{hotelData.roomsAvailable}
									<span className="text-[10px] sm:text-sm text-slate-400 font-bold ml-1">
										left
									</span>
								</p>
							</div>
						</div>

						{/* Booking Form */}
						<div className="space-y-5 sm:space-y-6">
							<div className="space-y-1.5 sm:space-y-2">
								<label className="text-[11px] sm:text-sm font-black text-slate-700 ml-1 uppercase tracking-wider">
									Check-in Date
								</label>
								<input
									type="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									className="w-full bg-slate-50 border-2 border-transparent px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-700 cursor-pointer text-sm sm:text-base"
								/>
							</div>

							<button
								onClick={() => {
									if (date.length === 0) {
										alert("specify date for booking!");
									} else {
										if (loggedIn) {
											if (!booked) {
												bookHotel(
													hotelData._id,
													hotelData.pricePerNight,
													date
												);
												setBooked(true);
											}
										} else {
											alert("log in to book hotel!");
										}
									}
								}}
								className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-xl transition-all duration-300 active:scale-95 ${
									booked
										? "bg-slate-100 text-slate-400 cursor-default shadow-none"
										: "bg-slate-900 text-white hover:bg-blue-600 shadow-slate-200"
								}`}
							>
								{booked ? "Booking Confirmed ✓" : "Reserve Now"}
							</button>

							{!booked && (
								<p className="text-center text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-tighter">
									⚡ Best price guaranteed • No immediate
									payment
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HotelDetails;
