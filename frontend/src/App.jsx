import Navbar from "./components/navbar.jsx";
import Hotels from "./pages/hotels.jsx";
import Home from "./pages/Home.jsx";
import Flights from "./pages/flights.jsx";
import Profile from "./pages/profile.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import HotelDetails from "./components/hotelDetails.jsx";
import FlightsDetails from "./components/flightDetails.jsx";
import "./App.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
	const { renewToken, setLoggedIn, setAccessToken, loading, setLoading } =
		useContext(AuthContext);

	useEffect(() => {
		async function abc() {
			setLoading(true);
			setAccessToken("");
			try {
				const newToken = await renewToken();
				setAccessToken(newToken);
				setLoggedIn(true);
			} catch (e) {
				console.log(e);
			}
			setTimeout(() => setLoading(false), 1500);
		}
		abc();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-[rgb(255,209,102)] p-6">
				<div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
				<p className="font-black text-white text-xl tracking-tighter animate-pulse">
					TravelMate
				</p>
			</div>
		);
	}

	return (
		<div className="relative min-h-screen w-full overflow-x-hidden bg-slate-50">
			<Navbar />
			<main className="w-full">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/hotels" element={<Hotels />} />
					<Route path="/hotels/:id" element={<HotelDetails />} />
					<Route path="/flights" element={<Flights />} />
					<Route path="/flights/:id" element={<FlightsDetails />} />
					<Route path="/me" element={<Profile />} />
					<Route
						path="/login"
						element={
							<div className="flex min-h-screen items-center justify-center p-4 pt-20 sm:pt-24">
								<Login />
							</div>
						}
					/>
					<Route
						path="/register"
						element={
							<div className="flex min-h-screen items-center justify-center p-4 pt-20 sm:pt-24">
								<Register />
							</div>
						}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
