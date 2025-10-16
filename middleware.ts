import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

const locales = ["en", "ar"];
const defaultLocale = "ar";

function getLocale(): string {
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes, static files, Next.js internals, and admin routes
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to Arabic with 307 (Temporary Redirect) to preserve method
  // Using 307 instead of 308 to avoid permanent caching issues
  const locale = getLocale();
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl, 307);
}

export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files
    '/((?!api|_next/static|_next/image|favicon|.*\\..*|admin).*)',
    // Match root path specifically
    '/'
  ],
};
