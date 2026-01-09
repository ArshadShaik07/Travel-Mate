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
	const [loggedIn, setLoggedIn] = useState(false);
	const [hotels, setHotels] = useState([]);
	const [flights, setFlights] = useState([]);
	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);
	axios.defaults.withCredentials = true;
	const backendUrl = "https://holidaybookingsystem-backend.onrender.com/api";

	async function handleRegister() {
		try {
			let res = await axios.post(`${backendUrl}/register`, {
				email,
				username,
				password,
			});
			console.log(res.data.message);
			alert(`${res.data.message} please login now!`);
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
			let res = await axios.post(`${backendUrl}/login`, {
				email,
				password,
			});
			navigate("/");
			setLoggedIn(true);
			console.log(res.data);
			setAccessToken(res.data.accessToken);
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
				`${backendUrl}/logout`,
				{},
				{
					withCredentials: true,
				}
			);

			alert(res.data.message);
			setLoggedIn(false);
		} catch (e) {
			console.error(e);
		}
	}

	async function updateProfile(email = "", username = "", password = "") {
		try {
			const updates = {};

			if (email.length !== 0) updates.email = email;
			if (username.length !== 0) updates.username = username;
			if (password.length !== 0) updates.password = password;

			let res = await axios.patch(`${backendUrl}/me`, updates, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			console.log(res.data);
			setUpdating(false);
			alert("updated successfully");
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				renewToken();
			}
			alert(e.response.data.error);
		}
	}

	async function fetchHotels(
		city,
		sortParam = "pricePerNight",
		sortOrder = 1
	) {
		try {
			const res = await axios.get(
				`${backendUrl}/hotels?city=${city}&sortParam=${sortParam}&sortOrder=${sortOrder}`
			);
			setHotels(res.data);
			console.log(res.data);
		} catch (e) {
			console.log(e);
			alert(e.response.data.error);
		}
	}

	async function fetchFlights(
		from = "",
		to = "",
		date = "",
		sortParam = "price",
		sortOrder = 1
	) {
		try {
			const res = await axios.get(
				`${backendUrl}/flights?from=${from}&to=${to}&date=${date}&sortParam=${sortParam}&sortOrder=${sortOrder}`
			);
			setFlights(res.data);
			console.log(res.data);
		} catch (e) {
			alert(e.response.data.error);
		}
	}
	async function fetchFlightById(id) {
		const res = await axios.get(`${backendUrl}/flights/${id}`);
		return res.data;
	}

	async function fetchHotelById(id) {
		const res = await axios.get(`${backendUrl}/hotels/${id}`);
		return res.data;
	}

	async function bookHotel(id, price, date) {
		try {
			const res = await axios.post(
				`${backendUrl}/bookings`,
				{
					type: "hotel",
					itemId: id,
					price,
					date,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(res.data);
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				alert("login first to book hotels!");
			}
		}
	}

	async function bookFlight(id, price, date) {
		try {
			const res = await axios.post(
				`${backendUrl}/bookings`,
				{
					type: "flight",
					itemId: id,
					price,
					date,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(res.data);
		} catch (e) {
			console.log(e.response.status);
			if (e.response.status === 401) {
				alert("login first to book flights!");
			}
		}
	}

	async function renewToken() {
		const res = await axios.get(`${backendUrl}/token`);
		return res.data.accessToken;
	}

	async function getMyProfile() {
		try {
			const res = await axios.get(`${backendUrl}/me`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			return res.data;
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				const newAccessToken = await renewToken();
				console.log(newAccessToken + " from profile");
				setAccessToken(newAccessToken);
				try {
					const res = await axios.get(`${backendUrl}/me`, {
						headers: {
							Authorization: `Bearer ${newAccessToken}`,
						},
					});
					return res.data;
				} catch (e) {
					alert("session expired!");
					handleLogout();
				}
			}
		}
	}

	async function getMybookings() {
		try {
			const res = await axios.get(`${backendUrl}/mybookings`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			console.log(res.data);
			return res.data;
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				try {
					const newAccessToken = await renewToken();
					setAccessToken(newAccessToken);
					const res = await axios.get(`${backendUrl}/mybookings`, {
						headers: {
							Authorization: `Bearer ${newAccessToken}`,
						},
					});
					return res.data;
				} catch (e) {
					alert("session expired!");
					handleLogout();
					navigate("/");
				}
			}
		}
	}

	async function deleteBooking(id) {
		try {
			const res = await axios.delete(`${backendUrl}/bookings/${id}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			alert(res.data.message);
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				try {
					const newAccessToken = await renewToken();
					setAccessToken(newAccessToken);
					const res = await axios.delete(
						`${backendUrl}/bookings/${id}`,
						{
							headers: {
								Authorization: `Bearer ${newAccessToken}`,
							},
						}
					);
					alert(res.data.message);
				} catch (e) {
					alert("session expired!");
					handleLogout();
					navigate("/");
				}
			}
		}
	}

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				setAccessToken,
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
				fetchHotels,
				hotels,
				setHotels,
				fetchFlights,
				flights,
				fetchFlightById,
				fetchHotelById,
				bookHotel,
				bookFlight,
				getMyProfile,
				getMybookings,
				deleteBooking,
				updateProfile,
				updating,
				setUpdating,
				loading,
				setLoading,
				renewToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
