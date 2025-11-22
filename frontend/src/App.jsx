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
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="relative">
			<Navbar />
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
						<div className="flex min-h-[calc(100vh-64px)] items-center justify-center gap-5">
							<Login />
						</div>
					}
				/>
				<Route
					path="/register"
					element={
						<div className="flex min-h-[calc(100vh-64px)] items-center justify-center gap-5">
							<Register />
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
