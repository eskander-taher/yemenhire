import { getDictionary } from "@/lib/dictionaries"
import { TendersListing } from "@/components/tenders/tenders-listing"
import { fetchTenders } from "@/lib/server-api"

export default async function TendersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined }
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "en" | "ar")

  // Await searchParams if it's a Promise (Next.js 15+)
  const resolvedSearchParams = typeof searchParams.then === "function" ? await searchParams : searchParams

  // Extract search parameters
  const search = resolvedSearchParams.search as string
  const category = resolvedSearchParams.category as string
  const location = resolvedSearchParams.location as string
  const page = Number.parseInt(resolvedSearchParams.page as string) || 1

  // Fetch tenders server-side
  const tendersData = await fetchTenders({
    search,
    category,
    location,
    page,
    limit: 20, // Changed from 12 to 20
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{dict.tenders.title}</h1>
          <p className="text-gray-600">{dict.tenders.subtitle}</p>
        </div>

        <TendersListing locale={locale} dict={dict} initialData={tendersData} searchParams={resolvedSearchParams} />
      </div>
    </div>
  )
}
