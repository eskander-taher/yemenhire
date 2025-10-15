"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

// CLIENT COMPONENT - Only handles interactivity
export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq: FAQItem, index: number) => (
        <Card
          key={index}
          className={`overflow-hidden transition-all duration-300 ${
            openIndex === index 
              ? "shadow-xl border-blue-200" 
              : "shadow-md hover:shadow-lg"
          }`}
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {faq.question}
              </h3>
            </div>
            <ChevronDown
              className={`w-6 h-6 text-blue-600 transition-transform duration-300 flex-shrink-0 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
          
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
          >
            <div className="px-6 pb-5 pt-2">
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

