import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://yemenhires.com'),
  title: {
    default: 'YemenHires - وظائف ومناقصات اليمن | Jobs & Tenders in Yemen',
    template: '%s | YemenHires'
  },
  description: 'منصة يمنية للوظائف والمناقصات - ابحث عن فرص العمل والمناقصات في اليمن | Yemeni platform for jobs and tenders - Find employment opportunities and tenders in Yemen',
  keywords: [
    'Yemen jobs',
    'وظائف اليمن',
    'Yemen tenders',
    'مناقصات اليمن',
    'وظائف صنعاء',
    'Sanaa jobs',
    'وظائف عدن',
    'Aden jobs',
    'Yemen employment',
    'فرص عمل اليمن',
    'مناقصات حكومية',
    'government tenders Yemen'
  ],
  authors: [{ name: 'YemenHires' }],
  creator: 'YemenHires',
  publisher: 'YemenHires',
  manifest: '/favicons/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicons/favicon.ico',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'ar': '/ar',
      'en': '/en',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
		<html suppressHydrationWarning lang="en" dir="ltr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#2563eb" />
			</head>
			<body suppressHydrationWarning className="min-h-screen bg-gray-50">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {children}
      </body>
		</html>
  );
}
