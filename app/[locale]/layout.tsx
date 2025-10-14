import type React from "react"
import type { Metadata } from "next"
import { Cairo, Inter } from "next/font/google"
import "../../styles/globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getDictionary } from "@/lib/dictionaries"
import { Providers } from "@/components/providers"
import { ClientApiStatus } from "@/components/layout/client-api-status"
import { JsonLd } from "@/components/seo/JsonLd"
import { LocaleHtmlAttributes } from "@/components/layout/LocaleHtmlAttributes"

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

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const metadata = {
    ar: {
      title: 'يمن هايرز - منصة الوظائف والمناقصات في اليمن',
      description: 'أكبر منصة يمنية للوظائف والمناقصات. ابحث عن فرص العمل، تصفح المناقصات الحكومية والخاصة، وقدم طلبك مباشرة عبر الإنترنت',
      keywords: [
        'وظائف اليمن',
        'مناقصات اليمن',
        'فرص عمل صنعاء',
        'وظائف عدن',
        'توظيف اليمن',
        'مناقصات حكومية',
        'فرص عمل حديثة',
        'وظائف شاغرة اليمن',
        'البحث عن عمل',
        'مناقصات خاصة'
      ],
      siteName: 'يمن هايرز'
    },
    en: {
      title: 'YemenHires - Jobs & Tenders Platform in Yemen',
      description: 'The largest Yemeni platform for jobs and tenders. Search for employment opportunities, browse government and private tenders, and apply directly online',
      keywords: [
        'Yemen jobs',
        'Yemen tenders',
        'Sanaa employment',
        'Aden jobs',
        'Yemen recruitment',
        'government tenders',
        'job opportunities Yemen',
        'career Yemen',
        'job search',
        'private tenders'
      ],
      siteName: 'YemenHires'
    }
  };

  const content = isArabic ? metadata.ar : metadata.en;

  return {
    title: {
      default: content.title,
      template: `%s | ${content.siteName}`
    },
    description: content.description,
    keywords: content.keywords,
    openGraph: {
      type: 'website',
      locale: isArabic ? 'ar_YE' : 'en_US',
      url: `https://yemenhires.com/${locale}`,
      siteName: content.siteName,
      title: content.title,
      description: content.description,
      images: [
        {
          url: '/yemenhires_logo.png',
          width: 1200,
          height: 630,
          alt: content.siteName,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: ['/yemenhires_logo.png'],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'ar': '/ar',
        'en': '/en',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
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
    <>
      <LocaleHtmlAttributes locale={locale} />
      <JsonLd locale={locale} />
      <Providers>
        <div className={`${inter.variable} ${cairo.variable} flex flex-col min-h-screen ${isRTL ? "font-cairo" : "font-inter"}`}>
          <Header locale={locale} dict={dict} />
          <main className="flex-1 pt-16">{children}</main>
          <Footer locale={locale} dict={dict} />
        </div>
        <ClientApiStatus />
      </Providers>
    </>
  )
}
