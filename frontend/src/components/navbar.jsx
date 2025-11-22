import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
	const { loggedIn, handleLogout } = useContext(AuthContext);

	return (
		<div
			className="sticky top-0 left-0 right-0 z-50
    w-full px-5 py-4 bg-[rgb(255,209,102)] shadow-md
    flex items-center justify-between"
		>
			{/* Logo */}
			<div className="text-2xl font-bold text-gray-800">
				<NavLink to="/">Travel Mate</NavLink>
			</div>

			{/* Right Links */}
			<div className="flex gap-10 text-lg font-medium text-gray-800">
				<p className="hover:text-gray-900 cursor-pointer transition">
					<NavLink to="/">Home</NavLink>
				</p>
				<p className="hover:text-gray-900 cursor-pointer transition">
					<NavLink to="/flights">Flights</NavLink>
				</p>
				<p className="hover:text-gray-900 cursor-pointer transition">
					<NavLink to="/hotels">Hotels</NavLink>
				</p>
				{!loggedIn && (
					<p className="hover:text-gray-900 cursor-pointer transition">
						<NavLink to="/login">Login</NavLink>
					</p>
				)}
				{!loggedIn && (
					<p className="hover:text-gray-900 cursor-pointer transition">
						<NavLink to="/register">Sign in</NavLink>
					</p>
				)}
				{loggedIn && (
					<p className="hover:text-gray-900 cursor-pointer transition">
						<NavLink to="/me">My Profile</NavLink>
					</p>
				)}
				{loggedIn && (
					<p className="hover:text-gray-900 cursor-pointer transition">
						<NavLink to="/" onClick={() => handleLogout()}>
							Log out
						</NavLink>
					</p>
				)}
			</div>
		</div>
	);
}

export default Navbar;
