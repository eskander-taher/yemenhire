import { getDictionary } from "@/lib/dictionaries"
import { TenderDetail } from "@/components/tenders/tender-detail"
import { fetchTender } from "@/lib/server-api"
import { notFound } from "next/navigation"

// Enable ISR - revalidate every hour
export const revalidate = 3600

interface TenderDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

export default async function TenderDetailPage({ params }: TenderDetailPageProps) {
  const { locale, id } = await params
  const dict = await getDictionary(locale as "en" | "ar")

  // Fetch tender server-side
  const tender = await fetchTender(id)

  if (!tender) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TenderDetail tender={tender} locale={locale} dict={dict} />
    </div>
  )
}
