import "../globals.css";
import { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/Nav";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "Yemen Hire | يمن هاير",
	description:
		"المنصة الأكبر للوظائف والمناقصات في اليمن | The biggest platform for jobs and tenders in Yemen",
};

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
			<body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
				<NextIntlClientProvider>
					<Providers>
						<div className="min-h-screen flex flex-col">
							<NavBar />
							<main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
								{children}
							</main>
							<Footer />
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
 