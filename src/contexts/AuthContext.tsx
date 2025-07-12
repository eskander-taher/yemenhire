"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import myAxios from "@/lib/myAxios";

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

// Auth query key for React Query
const AUTH_QUERY_KEY = ["auth", "user"];

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const queryClient = useQueryClient();

	// Use React Query for auth check with caching
	const {
		data: authData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: AUTH_QUERY_KEY,
		queryFn: async () => {
			const res = await myAxios.get("/auth/me", {
				withCredentials: true,
			});
			return res.data.username ? { username: res.data.username } : null;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 1,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	// Update local state when query data changes
	useEffect(() => {
		setUser(authData || null);
	}, [authData]);

	// Login mutation
	const loginMutation = useMutation({
		mutationFn: async ({ username, password }: { username: string; password: string }) => {
			const res = await myAxios.post(
				"/auth/login",
				{ username, password },
				{ withCredentials: true }
			);
			return res.data;
		},
		onSuccess: (data) => {
			const userData = { username: data.username };
			setUser(userData);
			// Update the cache
			queryClient.setQueryData(AUTH_QUERY_KEY, userData);
		},
		onError: (error) => {
			console.error("Login error:", error);
			throw error;
		},
	});

	// Register mutation
	const registerMutation = useMutation({
		mutationFn: async ({ username, password }: { username: string; password: string }) => {
			const res = await myAxios.post(
				"/auth/register",
				{ username, password },
				{ withCredentials: true }
			);
			return res.data;
		},
		onSuccess: (data) => {
			const userData = { username: data.username };
			setUser(userData);
			// Update the cache
			queryClient.setQueryData(AUTH_QUERY_KEY, userData);
		},
		onError: (error) => {
			console.error("Register error:", error);
			throw error;
		},
	});

	// Logout mutation
	const logoutMutation = useMutation({
		mutationFn: async () => {
			await myAxios.post("/auth/logout", {}, { withCredentials: true });
		},
		onSuccess: () => {
			setUser(null);
			// Clear the cache
			queryClient.setQueryData(AUTH_QUERY_KEY, null);
			queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
		},
		onError: (error) => {
			console.error("Logout error:", error);
			// Still clear user state even if logout request fails
			setUser(null);
			queryClient.setQueryData(AUTH_QUERY_KEY, null);
		},
	});

	const login = async (username: string, password: string) => {
		await loginMutation.mutateAsync({ username, password });
	};

	const register = async (username: string, password: string) => {
		await registerMutation.mutateAsync({ username, password });
	};

	const logout = async () => {
		await logoutMutation.mutateAsync();
	};

	const checkAuth = async () => {
		await refetch();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading: isLoading,
				login,
				register,
				logout,
				checkAuth,
			}}
		>
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
