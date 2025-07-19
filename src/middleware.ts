import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// List of protected routes (after locale)
const protectedRoutes = ["/me", "/dashboard", "/profile"];

export default async function middleware(req: NextRequest) {
	// Run next-intl middleware first
	const intlResult = intlMiddleware(req);
	if (intlResult instanceof Response && intlResult.status !== 200) {
		return intlResult;
	}

	// Extract locale from pathname
	const localeMatch = req.nextUrl.pathname.match(/^\/(ar|en)(\/|$)/);
	const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;

	// Path after locale
	const pathAfterLocale = req.nextUrl.pathname.replace(/^\/(ar|en)/, "");

	// Exclude /login and /register
	const isAuthPage = /^\/(login|register)(\/|$)/.test(pathAfterLocale);

	// Check if the path matches any protected route
	const isProtected = protectedRoutes.some(
		(route) => pathAfterLocale === route || pathAfterLocale.startsWith(`${route}/`)
	);

	if (isProtected && !isAuthPage) {
		const sessionId = req.cookies.get("sessionId");
		if (!sessionId) {
			// Redirect to login page for the current locale
			const loginUrl = `/${locale}/login`;
			return NextResponse.redirect(new URL(loginUrl, req.url));
		}
	}

	return intlResult;
}

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
