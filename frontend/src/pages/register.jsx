import { AuthContext } from "../context/AuthContext.jsx";
import { useContext, useEffect } from "react";
import CircularText from "../assets/circulartext.jsx";
import { NavLink } from "react-router-dom";

function Register() {
	const {
		email,
		setEmail,
		username,
		setUsername,
		password,
		setPassword,
		handleRegister,
	} = useContext(AuthContext);

	useEffect(() => {
		setEmail("");
		setUsername("");
		setPassword("");
	}, []);

	return (
		<div className="flex justify-center items-center rounded-xl bg-gray-300">
			<div className="flex flex-col items-center gap-5 bg-gray-200 p-8 rounded-xl shadow-lg w-[350px]">
				{/* Circular Logo */}
				<CircularText
					text="TRAVEL * MATE * "
					onHover="slowDown"
					spinDuration={30}
					className="scale-75 "
				/>

				{/* Email Input */}
				<input
					className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter email"
					type="email"
				/>
				{/*Username Input */}
				<input
					className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Enter username"
				/>

				{/* Password Input */}
				<input
					className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter password"
					type="password"
				/>

				{/* Sign in Button */}
				<button
					className="w-full bg-[rgb(255,209,102)] text-gray-900 py-2 rounded-lg font-semibold
                     hover:bg-[#ffcc5c] transition shadow"
					onClick={() => {
						if (!(email && username && password)) {
							alert("Some fields are empty!");
						} else {
							handleRegister();
						}
					}}
				>
					Sign In
				</button>

				{/* Login page */}
				<NavLink to="/login">
					<p className="text-sm text-gray-600 hover:text-gray-800 transition mt-2">
						Already have an account?
					</p>
				</NavLink>
			</div>
		</div>
	);
}

export default Register;
