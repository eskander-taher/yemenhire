import type React from "react"
import type { Metadata } from "next"
import { Cairo, Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getDictionary } from "@/lib/dictionaries"
import { Providers } from "@/components/providers"
import { ClientApiStatus } from "@/components/layout/client-api-status"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "YemenHire - Jobs & Tenders Platform",
  description: "Find jobs and tenders in Yemen. Post your opportunities and connect with talent.",
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "en" | "ar")
  const isRTL = locale === "ar"

  return (
    <html lang={locale} dir="ltr" className={`${inter.variable} ${cairo.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`min-h-screen bg-gray-50 ${isRTL ? "font-cairo" : "font-inter"}`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header locale={locale} dict={dict} />
            <main className="flex-1 pt-16">{children}</main>
            <Footer locale={locale} dict={dict} />
          </div>
          <ClientApiStatus />
        </Providers>
      </body>
    </html>
  )
}
