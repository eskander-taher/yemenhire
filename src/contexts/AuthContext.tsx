"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface User {
	username: string;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const checkAuth = async () => {
		try {
			const res = await axios.get("http://localhost:4000/api/auth/me", {
				withCredentials: true,
			});
			if (res.data.username) {
				setUser({ username: res.data.username });
			} else {
				setUser(null);
			}
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const login = async (username: string, password: string) => {
		const res = await axios.post(
			"http://localhost:4000/api/auth/login",
			{ username, password },
			{ withCredentials: true }
		);
		setUser({ username: res.data.username });
	};

	const register = async (username: string, password: string) => {
		const res = await axios.post(
			"http://localhost:4000/api/auth/register",
			{ username, password },
			{ withCredentials: true }
		);
		setUser({ username: res.data.username });
	};

	const logout = async () => {
		try {
			await axios.post(
				"http://localhost:4000/api/auth/logout",
				{},
				{ withCredentials: true }
			);
		} catch {
			// Ignore logout errors
		}
		setUser(null);
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
