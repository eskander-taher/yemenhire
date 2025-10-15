import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yemenhires.com'
  const currentDate = new Date()

  return [
    // Homepage
    {
      url: `${baseUrl}/ar`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar`,
          en: `${baseUrl}/en`,
        },
      },
    },
    // Jobs listing pages
    {
      url: `${baseUrl}/ar/jobs`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/jobs`,
          en: `${baseUrl}/en/jobs`,
        },
      },
    },
    {
      url: `${baseUrl}/en/jobs`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/jobs`,
          en: `${baseUrl}/en/jobs`,
        },
      },
    },
    // Tenders listing pages
    {
      url: `${baseUrl}/ar/tenders`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/tenders`,
          en: `${baseUrl}/en/tenders`,
        },
      },
    },
    {
      url: `${baseUrl}/en/tenders`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/tenders`,
          en: `${baseUrl}/en/tenders`,
        },
      },
    },
    // Advertise pages
    {
      url: `${baseUrl}/ar/advertise`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/advertise`,
          en: `${baseUrl}/en/advertise`,
        },
      },
    },
    {
      url: `${baseUrl}/en/advertise`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/advertise`,
          en: `${baseUrl}/en/advertise`,
        },
      },
    },
    // Thank you pages
    {
      url: `${baseUrl}/ar/thank-you`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/thank-you`,
          en: `${baseUrl}/en/thank-you`,
        },
      },
    },
    {
      url: `${baseUrl}/en/thank-you`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/thank-you`,
          en: `${baseUrl}/en/thank-you`,
        },
      },
    },
    // Note: Individual job and tender pages should be added dynamically
    // by fetching them from your API/database
  ]
}

