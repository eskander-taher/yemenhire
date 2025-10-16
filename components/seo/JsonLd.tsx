import Script from 'next/script';

interface JsonLdProps {
  locale: string;
}

export function JsonLd({ locale }: JsonLdProps) {
  const isArabic = locale === 'ar';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isArabic ? 'يمن هايرز' : 'YemenHires',
    url: 'https://yemenhires.com',
    logo: 'https://yemenhires.com/yemenhires_logo.png',
    description: isArabic 
      ? 'منصة يمنية للوظائف والمناقصات'
      : 'Yemeni platform for jobs and tenders',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Arabic', 'English']
    },
    sameAs: [
      // Add your social media links here when available
      // 'https://facebook.com/yemenhires',
      // 'https://twitter.com/yemenhires',
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isArabic ? 'يمن هايرز' : 'YemenHires',
    url: 'https://yemenhires.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://yemenhires.com/${locale}/jobs?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  );
}



