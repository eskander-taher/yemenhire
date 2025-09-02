import { Suspense } from "react"
import JobsPageContent from "@/components/jobs/jobs-page-content"

interface JobsPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined }
}

function JobsPageFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2 text-gray-600">Loading jobs...</p>
      </div>
    </div>
  )
}

export default function JobsPage({ params }: JobsPageProps) {
  return (
    <Suspense fallback={<JobsPageFallback />}>
      <JobsPageContent params={params} />
    </Suspense>
  )
}
