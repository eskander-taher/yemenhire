"use client"
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { AxiosError } from "axios";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const { login } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage("");
		try {
			await login(username, password);
			setMessage("Logged in successfully!");
			router.push("/me");
		} catch (err: unknown) {
			if (err && typeof err === "object" && "response" in err) {
				setMessage(
					(err as AxiosError<{ message?: string }>).response?.data?.message || "Error"
				);
			} else {
				setMessage("Error");
			}
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
