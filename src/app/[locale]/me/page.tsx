"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Me() {
	const [username, setUsername] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/auth/me", { withCredentials: true })
			.then((res) => {
				if (res.data.username) setUsername(res.data.username);
				else setMessage(res.data.message || "Not authenticated");
			})
			.catch(() => setMessage("Error fetching user info"));
	}, []);

	const handleLogout = async () => {
		try {
			const res = await axios.post(
				"http://localhost:4000/auth/logout",
				{},
				{ withCredentials: true }
			);
			setUsername("");
			setMessage(res.data.message || "Logged out");
		} catch (err) {
			setMessage("Error logging out");
		}
	};

	return (
		<div>
			<h2>Me</h2>
			{username ? (
				<>
					<div>Username: {username}</div>
					<button onClick={handleLogout}>Logout</button>
				</>
			) : (
				<div>{message}</div>
			)}
		</div>
	);
}
