"use client"

import { getClientDictionary } from "@/lib/client-dictionaries"
import { JobsListing } from "@/components/jobs/jobs-listing"
import { useJobs } from "@/hooks/useJobs"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

interface JobsPageContentProps {
  params: Promise<{ locale: string }>
}

export default function JobsPageContent({ params }: JobsPageContentProps) {
  const [locale, setLocale] = useState<string>("")
  const [dict, setDict] = useState<any>(null)
  const searchParams = useSearchParams()

  // Extract search parameters from URL
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  const location = searchParams.get("location") || ""
  const type = searchParams.get("type") || ""
  const page = Number.parseInt(searchParams.get("page") || "1")

  // Use TanStack Query to fetch jobs
  const { data: jobsData, isLoading, error } = useJobs({
    search,
    category,
    location,
    type,
    page,
    limit: 20,
  })

  // Load locale and dictionary
  useEffect(() => {
    const loadLocaleAndDict = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.locale)
      const dictionary = await getClientDictionary(resolvedParams.locale as "en" | "ar")
      setDict(dictionary)
    }
    loadLocaleAndDict()
  }, [params])

  if (!dict || !locale) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Error loading jobs</h2>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  // Create searchParams object for JobsListing component
  const searchParamsObj = {
    search,
    category,
    location,
    type,
    page: page.toString(),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{dict.jobs.title}</h1>
          <p className="text-gray-600">{dict.jobs.subtitle}</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Loading jobs...</p>
          </div>
        ) : (
          <JobsListing 
            locale={locale} 
            dict={dict} 
            initialData={jobsData || { jobs: [], total: 0, page: 1, limit: 20 }} 
            searchParams={searchParamsObj} 
          />
        )}
      </div>
    </div>
  )
}
