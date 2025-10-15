import { getDictionary } from "@/lib/dictionaries"
import { JobDetail } from "@/components/jobs/job-detail"
import { fetchJob } from "@/lib/server-api"
import { notFound } from "next/navigation"

// Enable ISR - revalidate every hour
export const revalidate = 3600

interface JobDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { locale, id } = await params
  const dict = await getDictionary(locale as "en" | "ar")

  // Fetch job server-side
  const job = await fetchJob(id)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <JobDetail job={job} locale={locale} dict={dict} />
    </div>
  )
}
