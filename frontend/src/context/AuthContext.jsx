import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [refreshToken, setRefreshToken] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	async function handleRegister() {
		try {
			let res = await axios.post("http://localhost:3000/api/register", {
				email,
				username,
				password,
			});
			console.log(res.data.message);
			setLoggedIn(true);
			alert(res.data);
			navigate("/");
		} catch (e) {
			console.log(e.response.data.error);
			alert(e.response.data.error);
		}
		setEmail("");
		setUsername("");
		setPassword("");
	}

	async function handleLogin() {
		try {
			let res = await axios.post("http://localhost:3000/api/login", {
				email,
				password,
			});
			navigate("/");
			setLoggedIn(true);
			console.log(res.data);
			setAccessToken(res.data.accessToken);
			setRefreshToken(res.data.refreshToken);
		} catch (e) {
			console.error(e.response.data);
			alert(e.response.data.error);
			return;
		}
		setEmail("");
		setPassword("");
		alert("Logged in successfully");
	}

	async function handleLogout() {
		try {
			let res = await axios.post(
				"http://localhost:3000/api/logout",
				{},
				{
					headers: {
						Authorization: `Bearer ${refreshToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			console.log(res.data);
			setLoggedIn(false);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				email,
				setEmail,
				password,
				setPassword,
				username,
				setUsername,
				handleLogin,
				loggedIn,
				setLoggedIn,
				handleLogout,
				handleRegister,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
