import Script from 'next/script';
import { Tender } from '@/lib/server-api';

interface TenderSchemaProps {
  tender: Tender;
  locale: string;
}

export function TenderSchema({ tender, locale }: TenderSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: tender.title,
    description: tender.description,
    provider: {
      '@type': 'Organization',
      name: tender.organization
    },
    areaServed: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: tender.location,
        addressCountry: 'YE'
      }
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://yemenhires.com/${locale}/tenders/${tender._id}`,
      availableLanguage: {
        '@type': 'Language',
        name: locale === 'ar' ? 'Arabic' : 'English'
      }
    },
    category: tender.category,
    offers: tender.budget ? {
      '@type': 'Offer',
      price: tender.budget,
      priceCurrency: 'YER'
    } : undefined,
    validFrom: tender.publishedAt || tender.createdAt,
    validThrough: tender.deadline,
  };

  return (
    <Script
      id={`tender-schema-${tender._id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}


