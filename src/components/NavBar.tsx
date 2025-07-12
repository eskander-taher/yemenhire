"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const getBasicNavItems = (t: (key: string) => string) => {
	return [{ href: "/", label: t("home") }];
};

const getUnauthenticatedNavItems = (t: (key: string) => string) => {
	return [
		{ href: "/", label: t("home") },
		{ href: "/login", label: t("login") },
		{ href: "/register", label: t("register") },
	];
};

export default function NavBar() {
	const pathname = usePathname();
	const { user, loading, logout } = useAuth();
	const router = useRouter();
	const t = useTranslations("Navigation");

	// Show different navigation items based on auth state
	const navItems = !loading && user ? getBasicNavItems(t) : getUnauthenticatedNavItems(t);

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/");
		} catch (err) {
			console.error("Error logging out:", err);
		}
	};

	// Prefetch routes on hover for faster navigation
	const handleMouseEnter = (href: string) => {
		router.prefetch(href);
	};

	return (
		<nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
			<div className="max-w-4xl mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo/Brand */}
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">Y</span>
						</div>
						<span className="text-xl font-bold text-gray-800">YemenHire</span>
					</div>

					{/* Navigation Links */}
					<div className="flex items-center space-x-1">
						{navItems.map((item) => {
							const isActive = item.href === pathname;
							return (
								<Link
									key={item.href}
									href={item.href}
									onMouseEnter={() => handleMouseEnter(item.href)}
									className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
										isActive
											? "bg-blue-600 text-white shadow-md"
											: "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
									}`}
								>
									{item.label}
								</Link>
							);
						})}

						{/* Auth-dependent items */}
						{!loading && user && (
							<>
								<Link
									href="/me"
									onMouseEnter={() => handleMouseEnter("/me")}
									className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
										pathname === "/me"
											? "bg-blue-600 text-white shadow-md"
											: "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
									}`}
								>
									{t("me")}
								</Link>
								<button
									onClick={handleLogout}
									className="px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
								>
									{t("logout")}
								</button>
							</>
						)}

						{/* Language Switcher */}
						<div className="ml-4">
							<LanguageSwitcher />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
