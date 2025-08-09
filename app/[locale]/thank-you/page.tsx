import { getDictionary } from "@/lib/dictionaries"
import { ThankYouPage } from "@/components/thank-you/thank-you-page"

export default async function ThankYou({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "en" | "ar")

  return <ThankYouPage locale={locale} dict={dict} searchParams={searchParams} />
}
