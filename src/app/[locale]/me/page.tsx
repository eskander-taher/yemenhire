"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Me() {
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/");
		} catch (err) {
			console.error("Error logging out:", err);
		}
	};

	if (!user) {
		return (
			<div>
				<h2>Me</h2>
				<div>Please log in to view your profile.</div>
			</div>
		);
	}

	return (
		<div>
			<h2>Me</h2>
			<div>Username: {user.username}</div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}
