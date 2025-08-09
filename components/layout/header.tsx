"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Briefcase, FileText, Plus, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import Image from "next/image";

interface HeaderProps {
	locale: string;
	dict: any;
}

export function Header({ locale, dict }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();
	const isRTL = locale === "ar";

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navigation = [
		{ name: dict.nav.home, href: `/${locale}`, icon: null },
		{ name: dict.nav.jobs, href: `/${locale}/jobs`, icon: Briefcase },
		{ name: dict.nav.tenders, href: `/${locale}/tenders`, icon: FileText },
		{ name: dict.nav.advertise, href: `/${locale}/advertise`, icon: Plus },
	];

	const isActive = (href: string) => {
		if (href === `/${locale}`) {
			return pathname === href;
		}
		return pathname.startsWith(href);
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
					: "bg-white/80 backdrop-blur-sm"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link
						href={`/${locale}`}
						className="flex items-center space-x-2 rtl:space-x-reverse group"
					>
						<div className="relative">
							<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden">
								<Image
									src="/yemenhire_logo_short.png" // assuming it's in public folder
									alt="YemenHire Logo"
									width={40}
									height={40}
									className="object-contain"
								/>
							</div>
						</div>
						<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							YemenHire
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
						{navigation.map((item) => {
							const Icon = item.icon;
							const active = isActive(item.href);
							return (
								<Link
									key={item.href}
									href={item.href}
									className={`relative flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
										active
											? "text-blue-600 bg-blue-50"
											: "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
									}`}
								>
									{Icon && <Icon className="w-4 h-4" />}
									<span>{item.name}</span>
									{active && (
										<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
									)}
								</Link>
							);
						})}
					</nav>

					{/* Language Switcher & Mobile Menu Button */}
					<div className="flex items-center space-x-4 rtl:space-x-reverse">
						<LanguageSwitcher locale={locale} dict={dict} />

						<Button
							variant="ghost"
							size="sm"
							className="md:hidden hover:bg-gray-100 rounded-xl"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden border-t border-gray-200/50 py-4 animate-slide-up">
						<nav className="flex flex-col space-y-2">
							{navigation.map((item) => {
								const Icon = item.icon;
								const active = isActive(item.href);
								return (
									<Link
										key={item.href}
										href={item.href}
										className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
											active
												? "text-blue-600 bg-blue-50"
												: "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
										}`}
										onClick={() => setIsMenuOpen(false)}
									>
										{Icon && <Icon className="w-4 h-4" />}
										<span>{item.name}</span>
									</Link>
								);
							})}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
