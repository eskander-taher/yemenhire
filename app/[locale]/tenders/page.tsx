import { getDictionary } from "@/lib/dictionaries"
import { TendersPageClient } from "@/components/tenders/tenders-page-client"
import { fetchTenders } from "@/lib/server-api"

// Revalidate every 5 minutes (tenders update frequently)
export const revalidate = 300

interface TendersPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TendersPage({ params, searchParams }: TendersPageProps) {
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

  // Fetch tenders server-side
  const initialTendersData = await fetchTenders({
    search,
    category,
    location,
    city,
    organization,
    page,
    limit: 20,
  })

  return (
    <TendersPageClient
      locale={locale}
      dict={dict}
      initialData={initialTendersData}
      searchParams={resolvedSearchParams}
    />
  )
}
