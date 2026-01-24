import { useNavigate } from "react-router-dom";

function Hotel({ hotel }) {
	const navigate = useNavigate();

	return (
		<div
			className="group w-full max-w-4xl bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 p-3 sm:p-5 flex flex-col md:flex-row gap-4 sm:gap-6 cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300"
			onClick={() => navigate(`/hotels/${hotel._id}`)}
		>
			{/* Image Section - Responsive height */}
			<div className="w-full md:w-64 lg:w-72 h-40 sm:h-48 md:h-auto overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 shrink-0">
				<img
					src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop"
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
					alt={hotel.name}
				/>
			</div>

			{/* Content Section */}
			<div className="flex flex-col justify-between flex-1 py-1">
				<div className="flex flex-col gap-0.5 sm:gap-1">
					<div className="flex justify-between items-start">
						<span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-blue-600">
							Featured Property
						</span>
						<div className="flex items-center gap-1 text-amber-500">
							<span className="text-xs sm:text-sm font-bold">
								★ 4.8
							</span>
						</div>
					</div>

					<h3 className="text-lg sm:text-2xl font-black text-slate-900 capitalize leading-tight">
						{hotel.name}
					</h3>

					<div className="flex items-center gap-1 text-slate-500 font-medium">
						<span className="text-xs sm:text-sm">
							📍 {hotel.city}
						</span>
					</div>
				</div>

				<div className="flex items-end justify-between mt-4 md:mt-0">
					<div className="flex flex-col">
						<p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
							₹{hotel.pricePerNight}
							<span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter ml-1">
								/ night
							</span>
						</p>
						<p
							className={`text-[10px] font-bold uppercase tracking-wide mt-1 ${
								hotel.roomsAvailable < 5
									? "text-orange-500"
									: "text-slate-400"
							}`}
						>
							{hotel.roomsAvailable} rooms left
						</p>
					</div>

					<button
						className="px-5 sm:px-8 py-2 sm:py-3 bg-slate-900 text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm
                               group-hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-slate-200"
					>
						View Stay
					</button>
				</div>
			</div>
		</div>
	);
}

export default Hotel;
