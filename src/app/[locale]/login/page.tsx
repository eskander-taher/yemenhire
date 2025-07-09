"use client"
import { useState } from "react";
import axios from "axios";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		try {
			const res = await axios.post(
				"http://localhost:4000/api/auth/login",
				{ username, password },
				{ withCredentials: true }
			);
			setMessage("Logged in as " + res.data.username);
		} catch (err) {
			setMessage(err.response?.data?.message || "Error");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
			<div>{message}</div>
		</div>
	);
}
