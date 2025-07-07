"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = useLocale();

	const switchToLocale = (locale: string) => {
		if (locale === currentLocale) return;

		const segments = pathname.split("/");
		if (segments[1] === currentLocale) {
			segments[1] = locale;
		}
		const newPath = segments.join("/");
		router.push(newPath);
	};

	const getNextLocale = () => {
		const currentIndex = routing.locales.indexOf(currentLocale as "ar" | "en");
		const nextIndex = (currentIndex + 1) % routing.locales.length;
		return routing.locales[nextIndex];
	};

	const getFlag = (locale: "ar" | "en") => {
		switch (locale) {
			case "en":
				return "ar";
			case "ar":
				return "en";
			default:
				return "🏳️";
		}
	};

	return (
		<button
			onClick={() => switchToLocale(getNextLocale())}
			className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
			title={`Switch to ${getNextLocale().toUpperCase()}`}
		>
			<span className="text-lg">{getFlag(currentLocale as "ar" | "en")}</span>
		</button>
	);
}
