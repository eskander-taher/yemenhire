import { getDictionary } from "@/lib/dictionaries"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { FeaturesSection } from "@/components/home/features-section"
import { FAQSection } from "@/components/home/faq-section"
import { FAQSchema } from "@/components/seo/FAQSchema"
import { fetchStats } from "@/lib/server-api"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "en" | "ar")

  // Fetch stats server-side
  const stats = await fetchStats()

  return (
    <>
      <FAQSchema faqs={dict.home.faq?.items || []} locale={locale} />
      <div className="min-h-screen">
        <HeroSection locale={locale} dict={dict} />
        <StatsSection locale={locale} dict={dict} stats={stats} />
        <FeaturesSection locale={locale} dict={dict} />
        <FAQSection locale={locale} dict={dict} />
      </div>
    </>
  )
}
