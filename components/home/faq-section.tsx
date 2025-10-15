import { HelpCircle } from "lucide-react"
import { FAQAccordion } from "./faq-accordion"

interface FAQSectionProps {
  locale: string
  dict: any
}

// SERVER COMPONENT - SEO-friendly, content is in HTML
export function FAQSection({ locale, dict }: FAQSectionProps) {
  const faqs = dict.home.faq?.items || []

  if (!faqs.length) return null

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">{dict.home.faq?.title || "Frequently Asked Questions"}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {dict.home.faq?.subtitle || "Find answers to common questions about our platform"}
          </p>
        </div>

        {/* FAQ Accordion - Client component for interactivity */}
        <FAQAccordion faqs={faqs} />

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {dict.home.faq?.stillHaveQuestions || "Still have questions?"}
          </p>
          <a
            href={`/${locale}/advertise`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {dict.home.faq?.contactUs || "Contact Us"}
          </a>
        </div>
      </div>
    </section>
  )
}
