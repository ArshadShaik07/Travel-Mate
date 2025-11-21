import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import CircularText from "../assets/circulartext.jsx";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
	const { email, setEmail, password, setPassword, handleLogin, loggedIn } =
		useContext(AuthContext);

	useEffect(() => {
		setEmail("");
		setPassword("");
	}, []);
	return (
		<div className="flex justify-center items-center  bg-gray-300">
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
                     focus:ring-2 focus:border-[rgb(17,138,178)] focus:ring-[rgb(17,138,178)]"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter email"
					type="email"
				/>

				{/* Password Input */}
				<input
					className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none 
                     focus:ring-2 focus:border-[rgb(17,138,178)] focus:ring-[rgb(17,138,178)] "
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter password"
					type="password"
					onKeyDown={(e) => {
						if (
							email.length !== 0 &&
							password.length !== 0 &&
							e.key === "Enter"
						) {
							handleLogin();
						}
					}}
				/>

				{/* Login Button */}
				<button
					className="w-full bg-[#FFD166] text-gray-900 py-2 rounded-lg font-semibold
                     hover:bg-[#ffcc5c] transition shadow"
					onClick={() => {
						if (email.length !== 0 && password.length !== 0) {
							handleLogin();
						} else {
							alert("Fill details correctly");
						}
					}}
				>
					Log In
				</button>

				{/* Register Link */}
				<NavLink to="/register">
					<p className="text-sm text-gray-600 hover:text-gray-800 transition mt-2">
						Create a new account?
					</p>
				</NavLink>
			</div>
		</div>
	);
}

export default Login;
