"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const getNavItems = (isLoggedIn: boolean) => {
	const items = [
		{ href: "/", label: "Home" },
		{ href: "/login", label: "Login" },
		{ href: "/register", label: "Register" },
	];

	if (isLoggedIn) {
		items.push({ href: "/me", label: "Me" });
	}

	return items;
};

export default function NavBar() {
	const pathname = usePathname();
	const locale = useLocale();
	const { user, loading, logout } = useAuth();
	const router = useRouter();

	console.log(pathname);
	console.log(locale);

	if (loading) {
		return (
			<nav className="bg-gray-100 border-b mb-8">
				<div className="max-w-4xl mx-auto px-4 py-3 flex gap-4 items-center">
					<div className="text-gray-500">Loading...</div>
				</div>
			</nav>
		);
	}

	const navItems = getNavItems(!!user);

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
				{user && (
					<button
						onClick={handleLogout}
						className="px-3 py-1 rounded hover:bg-red-200 transition-colors text-gray-800"
					>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
}
