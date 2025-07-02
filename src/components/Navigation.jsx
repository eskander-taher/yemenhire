"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: "Home" },
		{ href: "/jobs", label: "Jobs" },
		{ href: "/tenders", label: "Tenders" },
		{ href: "/dashboard", label: "Dashboard" },
		{ href: "/bookmarks", label: "Bookmarks" },
		{ href: "/profile", label: "Profile" },
		{ href: "/advertise", label: "Advertise" },
	];

	const authItems = [
		{ href: "/login", label: "Login" },
		{ href: "/register", label: "Register" },
	];

	return (
		<nav className="bg-white shadow-lg border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex-shrink-0 flex items-center">
							<span className="text-xl font-bold text-gray-800">YemenAd</span>
						</Link>
						<div className="hidden md:ml-6 md:flex md:space-x-8">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
										pathname === item.href
											? "border-blue-500 text-gray-900"
											: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
									}`}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>
					<div className="flex items-center space-x-4">
						{authItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
									item.label === "Login"
										? "text-blue-600 bg-white hover:bg-gray-50"
										: "text-white bg-blue-600 hover:bg-blue-700"
								}`}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
}
