"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

const getNavItems = (t: (key: string) => string) => {
	return [
		{ href: "/", label: t("home") },
		{ href: "/jobs", label: t("jobs") },
		{ href: "/tenders", label: t("tenders") },
		{ href: "/advertise", label: t("advertise") },
	];
	
};

export default function NavBar() {
	const pathname = usePathname();
	const t = useTranslations("Navigation");

	const navItems = getNavItems(t);

	return (
		<nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
			<div className="max-w-4xl mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo/Brand */}
					<Link href="/">
						<div className="flex items-center space-x-2">
							<div className="w-10 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
								<Image
									src="/yemenhire_logo_short.png"
									alt="Yemen Hire logo"
									width={180}
									height={38}
									priority
								/>
							</div>
							<span className="text-xl font-bold text-gray-800">YemenHire</span>
						</div>
					</Link>

					{/* Navigation Links */}
					<div className="flex items-center space-x-1">
						{navItems.map((item) => {
							const isActive = item.href === pathname;
							return (
								<Link
									key={item.href}
									href={item.href}
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
