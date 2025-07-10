"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const { register } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		try {
			await register(username, password);
			setMessage("Registered successfully!");
			router.push("/me");
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
