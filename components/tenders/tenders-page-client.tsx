"use client"

import { TendersListing } from "@/components/tenders/tenders-listing"
import type { TendersResponse } from "@/lib/server-api"

interface TendersPageClientProps {
  locale: string
  dict: any
  initialData: TendersResponse
  searchParams: { [key: string]: string | string[] | undefined }
}

export function TendersPageClient({ locale, dict, initialData, searchParams }: TendersPageClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TendersListing
        locale={locale}
        dict={dict}
        initialData={initialData}
        searchParams={searchParams}
      />
    </div>
  )
}

