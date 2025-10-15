"use client"

import { JobsListing } from "@/components/jobs/jobs-listing"
import type { JobsResponse } from "@/lib/server-api"

interface JobsPageClientProps {
  locale: string
  dict: any
  initialData: JobsResponse
  searchParams: { [key: string]: string | string[] | undefined }
}

export function JobsPageClient({ locale, dict, initialData, searchParams }: JobsPageClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <JobsListing
        locale={locale}
        dict={dict}
        initialData={initialData}
        searchParams={searchParams}
      />
    </div>
  )
}

