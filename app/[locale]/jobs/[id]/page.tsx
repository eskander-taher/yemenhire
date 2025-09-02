"use client"

import { getClientDictionary } from "@/lib/client-dictionaries"
import { JobDetail } from "@/components/jobs/job-detail"
import { useJob } from "@/hooks/useJobs"
import { useEffect, useState } from "react"
import { notFound } from "next/navigation"

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const [locale, setLocale] = useState<string>("")
  const [id, setId] = useState<string>("")
  const [dict, setDict] = useState<any>(null)

  // Load params, locale and dictionary
  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.locale)
      setId(resolvedParams.id)
      const dictionary = await getClientDictionary(resolvedParams.locale as "en" | "ar")
      setDict(dictionary)
    }
    loadParams()
  }, [params])

  // Use TanStack Query to fetch job
  const { data: job, isLoading, error } = useJob(id)

  if (!dict || !locale || !id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <JobDetail job={job} locale={locale} dict={dict} />
    </div>
  )
}
