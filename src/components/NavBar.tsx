"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const getBasicNavItems = () => {
	return [{ href: "/", label: "Home" }];
};

const getUnauthenticatedNavItems = () => {
	return [
		{ href: "/", label: "Home" },
		{ href: "/login", label: "Login" },
		{ href: "/register", label: "Register" },
	];
};

export default function NavBar() {
	const pathname = usePathname();
	const { user, loading, logout } = useAuth();
	const router = useRouter();

	// Show different navigation items based on auth state
	const navItems = !loading && user ? getBasicNavItems() : getUnauthenticatedNavItems();

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/");
		} catch (err) {
			console.error("Error logging out:", err);
		}
	};

	return (
		<nav className="bg-gray-100 border-b mb-8">
			<div className="max-w-4xl mx-auto px-4 py-3 flex gap-4 items-center">
				{/* Show navigation items based on auth state */}
				{navItems.map((item) => {
					const isActive = item.href === pathname;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={`px-3 py-1 rounded hover:bg-blue-200 transition-colors ${
								isActive ? "bg-blue-600 text-white" : "text-gray-800"
							}`}
						>
							{item.label}
						</Link>
					);
				})}

				{/* Show auth-dependent items only after loading */}
				{!loading && user && (
					<>
						<Link
							href="/me"
							className={`px-3 py-1 rounded hover:bg-blue-200 transition-colors ${
								pathname === "/me" ? "bg-blue-600 text-white" : "text-gray-800"
							}`}
						>
							Me
						</Link>
						<button
							onClick={handleLogout}
							className="px-3 py-1 rounded hover:bg-red-200 transition-colors text-gray-800"
						>
							Logout
						</button>
					</>
				)}
			</div>
		</nav>
	);
}
