import { getDictionary } from "@/lib/dictionaries"
import { AdvertiseForm } from "@/components/advertise/advertise-form"

export default async function AdvertisePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "en" | "ar")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{dict.advertise.title}</h1>
          <p className="text-gray-600">{dict.advertise.subtitle}</p>
        </div>

        <AdvertiseForm locale={locale} dict={dict} />
      </div>
    </div>
  )
}
