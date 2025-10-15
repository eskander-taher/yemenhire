import Script from 'next/script';
import { Job } from '@/lib/server-api';

interface JobPostingSchemaProps {
  job: Job;
  locale: string;
}

export function JobPostingSchema({ job, locale }: JobPostingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: 'YemenHires',
      value: job._id
    },
    datePosted: job.publishedAt || job.createdAt,
    validThrough: job.deadline,
    employmentType: 'FULL_TIME', // You might want to make this dynamic
    hiringOrganization: {
      '@type': 'Organization',
      name: job.organization,
      sameAs: 'https://yemenhires.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'YE'
      }
    },
    baseSalary: job.salary ? {
      '@type': 'MonetaryAmount',
      currency: 'YER',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: 'MONTH'
      }
    } : undefined,
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Yemen'
    },
    jobLocationType: 'TELECOMMUTE', // Adjust as needed
    industry: job.category,
  };

  return (
    <Script
      id={`job-posting-schema-${job._id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}


