"use client";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useOptimizedNavigation() {
	const router = useRouter();
	const pathname = usePathname();

	const navigate = useCallback((href: string) => {
		// If navigating to the same page, do nothing
		if (href === pathname) return;

		// Use replace for better performance when appropriate
		// This prevents adding unnecessary entries to browser history
		if (href === "/" || href === "/login" || href === "/register") {
			router.replace(href);
		} else {
			router.push(href);
		}
	}, [router, pathname]);

	const prefetch = useCallback((href: string) => {
		router.prefetch(href);
	}, [router]);

	return {
		navigate,
		prefetch,
		pathname,
	};
} 