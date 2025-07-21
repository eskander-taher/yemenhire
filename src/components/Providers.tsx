"use client";
import { ReactNode, useState, useEffect } from "react";
import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Increase stale time to reduce unnecessary refetches
				staleTime: 5 * 60 * 1000, // 5 minutes
				// Cache data for longer
				gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
				// Retry failed requests
				retry: 1,
				// Refetch on window focus
				refetchOnWindowFocus: false,
				// Refetch on reconnect
				refetchOnReconnect: true,
			},
			mutations: {
				// Retry failed mutations
				retry: 1,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

// Loading component for page transitions
function LoadingSpinner() {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleStart = () => setIsLoading(true);
		const handleComplete = () => setIsLoading(false);

		// Listen for route changes
		window.addEventListener("beforeunload", handleStart);
		window.addEventListener("load", handleComplete);

		return () => {
			window.removeEventListener("beforeunload", handleStart);
			window.removeEventListener("load", handleComplete);
		};
	}, []);

	if (!isLoading) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-1 bg-blue-600 z-50">
			<div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse"></div>
		</div>
	);
}

export default function Providers({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<LoadingSpinner />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{children}
		</QueryClientProvider>
	);
}
