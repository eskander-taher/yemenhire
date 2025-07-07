"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const locales = ["en", "ar"] as const;

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

	return (
		<div className="flex gap-2">
			{locales.map((locale) => (
				<button key={locale} onClick={() => switchToLocale(locale)}>
					{locale.toUpperCase()}
				</button>
			))}
		</div>
	);
}
