"use client";

import { useState } from "react";
import axios from "axios";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		try {
			const res = await axios.post(
				"http://localhost:4000/api/auth/register",
				{ username, password },
				{ withCredentials: true }
			);
			setMessage("Registered as " + res.data.username);
		} catch (err) {
			setMessage(err.response?.data?.message || "Error");
		}
	};

	return (
		<div>
			<h2>Register</h2>
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
				<button type="submit">Register</button>
			</form>
			<div>{message}</div>
		</div>
	);
}
