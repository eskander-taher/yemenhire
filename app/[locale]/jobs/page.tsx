import { getDictionary } from "@/lib/dictionaries"
import { JobsPageClient } from "@/components/jobs/jobs-page-client"
import { fetchJobs } from "@/lib/server-api"

// Revalidate every 5 minutes (jobs update frequently)
export const revalidate = 300

interface JobsPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function JobsPage({ params, searchParams }: JobsPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale as "en" | "ar")
  const resolvedSearchParams = await searchParams

  // Extract search parameters
  const search = (resolvedSearchParams.search as string) || ""
  const category = (resolvedSearchParams.category as string) || ""
  const location = (resolvedSearchParams.location as string) || ""
  const city = (resolvedSearchParams.city as string) || ""
  const organization = (resolvedSearchParams.organization as string) || ""
  const page = Number.parseInt((resolvedSearchParams.page as string) || "1")

  // Fetch jobs server-side
  const initialJobsData = await fetchJobs({
    search,
    category,
    location,
    city,
    organization,
    page,
    limit: 20,
  })

  return (
    <JobsPageClient
      locale={locale}
      dict={dict}
      initialData={initialJobsData}
      searchParams={resolvedSearchParams}
    />
  )
}
