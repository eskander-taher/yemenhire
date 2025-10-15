'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId: string
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// Event tracking utilities
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    })
  }
}

// Track job views
export const trackJobView = (jobId: string, jobTitle: string) => {
  trackEvent('view_job', 'Jobs', `${jobTitle} (${jobId})`)
}

// Track tender views
export const trackTenderView = (tenderId: string, tenderTitle: string) => {
  trackEvent('view_tender', 'Tenders', `${tenderTitle} (${tenderId})`)
}

// Track searches
export const trackSearch = (searchTerm: string, resultCount: number) => {
  trackEvent('search', 'Search', searchTerm, resultCount)
}


