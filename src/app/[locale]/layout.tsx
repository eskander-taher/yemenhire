import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	// Ensure that the incoming `locale` is valid
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
			<body>
				<NextIntlClientProvider>
					<Providers>
						<NavBar />
						<LanguageSwitcher />
						{children}
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
