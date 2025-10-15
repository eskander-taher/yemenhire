import { Metadata } from 'next'
import { fetchJob } from '@/lib/server-api'

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params
  
  try {
    const job = await fetchJob(id)
    
    if (!job) {
      return {
        title: locale === 'ar' ? 'وظيفة غير موجودة' : 'Job Not Found',
        description: locale === 'ar' ? 'الوظيفة المطلوبة غير موجودة' : 'The requested job does not exist'
      }
    }

    const title = locale === 'ar' 
      ? `${job.title} - وظائف ${job.location}`
      : `${job.title} - Jobs in ${job.location}`
    
    const description = locale === 'ar'
      ? `${job.title} في ${job.organization}. ${job.description?.substring(0, 155)}...`
      : `${job.title} at ${job.organization}. ${job.description?.substring(0, 155)}...`

    const keywords = locale === 'ar'
      ? [
          job.title,
          `وظائف ${job.location}`,
          `وظائف ${job.organization}`,
          job.category || '',
          'وظائف اليمن',
          'فرص عمل',
        ]
      : [
          job.title,
          `jobs in ${job.location}`,
          `${job.organization} jobs`,
          job.category || '',
          'Yemen jobs',
          'employment opportunities',
        ]

    return {
      title,
      description,
      keywords,
      openGraph: {
        type: 'article',
        locale: locale === 'ar' ? 'ar_YE' : 'en_US',
        url: `https://yemenhires.com/${locale}/jobs/${id}`,
        title,
        description,
        siteName: locale === 'ar' ? 'يمن هايرز' : 'YemenHires',
        publishedTime: job.createdAt,
        modifiedTime: job.updatedAt,
        images: [
          {
            url: '/yemenhires_logo.png',
            width: 1200,
            height: 630,
            alt: job.organization,
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
        canonical: `/${locale}/jobs/${id}`,
        languages: {
          'ar': `/ar/jobs/${id}`,
          'en': `/en/jobs/${id}`,
        },
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch (error) {
    return {
      title: locale === 'ar' ? 'وظيفة' : 'Job',
      description: locale === 'ar' ? 'تفاصيل الوظيفة' : 'Job details'
    }
  }
}

export default function JobDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

