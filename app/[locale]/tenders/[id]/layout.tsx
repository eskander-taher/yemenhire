import { Metadata } from 'next'
import { fetchTender } from '@/lib/server-api'

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params
  
  try {
    const tender = await fetchTender(id)
    
    if (!tender) {
      return {
        title: locale === 'ar' ? 'مناقصة غير موجودة' : 'Tender Not Found',
        description: locale === 'ar' ? 'المناقصة المطلوبة غير موجودة' : 'The requested tender does not exist'
      }
    }

    const title = locale === 'ar' 
      ? `${tender.title} - مناقصات ${tender.location}`
      : `${tender.title} - Tenders in ${tender.location}`
    
    const description = locale === 'ar'
      ? `${tender.title} من ${tender.organization}. ${tender.description?.substring(0, 155)}...`
      : `${tender.title} by ${tender.organization}. ${tender.description?.substring(0, 155)}...`

    const keywords = locale === 'ar'
      ? [
          tender.title,
          `مناقصات ${tender.location}`,
          `مناقصات ${tender.organization}`,
          tender.category || '',
          'مناقصات اليمن',
          'عطاءات',
        ]
      : [
          tender.title,
          `tenders in ${tender.location}`,
          `${tender.organization} tenders`,
          tender.category || '',
          'Yemen tenders',
          'procurement',
        ]

    return {
      title,
      description,
      keywords,
      openGraph: {
        type: 'article',
        locale: locale === 'ar' ? 'ar_YE' : 'en_US',
        url: `https://yemenhires.com/${locale}/tenders/${id}`,
        title,
        description,
        siteName: locale === 'ar' ? 'يمن هايرز' : 'YemenHires',
        publishedTime: tender.createdAt,
        modifiedTime: tender.updatedAt,
        images: [
          {
            url: '/yemenhires_logo.png',
            width: 1200,
            height: 630,
            alt: tender.organization,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/yemenhires_logo.png'],
      },
      alternates: {
        canonical: `/${locale}/tenders/${id}`,
        languages: {
          'ar': `/ar/tenders/${id}`,
          'en': `/en/tenders/${id}`,
        },
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch (error) {
    return {
      title: locale === 'ar' ? 'مناقصة' : 'Tender',
      description: locale === 'ar' ? 'تفاصيل المناقصة' : 'Tender details'
    }
  }
}

export default function TenderDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

