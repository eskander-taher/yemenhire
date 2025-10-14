"use client";

import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<AdminAuthProvider>
				<ToastContainer position="top-center" />
				<main dir="ltr">{children}</main>
			</AdminAuthProvider>
		</QueryClientProvider>
	);
}

