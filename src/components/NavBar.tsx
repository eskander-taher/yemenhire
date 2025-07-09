"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/login", label: "Login" },
	{ href: "/register", label: "Register" },
	{ href: "/me", label: "Me" },
];

export default function NavBar() {
	const pathname = usePathname();
	const locale = useLocale();

	console.log(pathname);
	console.log(locale)

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
			</div>
		</nav>
	);
}
