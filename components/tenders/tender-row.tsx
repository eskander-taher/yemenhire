"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import type { Tender } from "@/lib/server-api"

interface TenderRowProps {
  tender: Tender
  locale: string
  dict: any
}

export function TenderRow({ tender, locale, dict }: TenderRowProps) {
  const isRTL = locale === "ar"

  const getTenderTypeColor = (type?: string) => {
    switch (type) {
      case "open":
        return "bg-green-100 text-green-800"
      case "restricted":
        return "bg-orange-100 text-orange-800"
      case "closed":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const displayDate = tender.publishedAt || tender.createdAt
  const deadlineDate = tender.deadline

  // Calculate days remaining
  const daysRemaining = deadlineDate
    ? Math.ceil((new Date(deadlineDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Published Date */}
      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-sm text-gray-600">
          {formatDate(displayDate, locale, { month: "short", day: "numeric" })}
        </div>
      </td>

      {/* Organization */}
      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center ${isRTL ? ' justify-end' : 'justify-start'}`}>
          <span className={`text-sm text-gray-900 truncate ${isRTL ? 'mr-2' : 'ml-2'}`}>
            {tender.organization || "Organization"}
          </span>
        </div>
      </td>

      {/* Tender Title */}
      <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <Link
          href={`/${locale}/tenders/${tender._id}`}
          className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
        >
          {tender.title}
        </Link>
      </td>

      {/* Location */}
      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-sm text-gray-600">{tender.location}</div>
      </td>

      {/* Deadline */}
      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
        {deadlineDate ? (
          <div className="space-y-1">
            <div className={`text-sm ${daysRemaining && daysRemaining <= 7 ? "text-red-600 font-medium" : "text-gray-600"}`}>
              {formatDate(deadlineDate, locale, { month: "short", day: "numeric" })}
            </div>
            {daysRemaining !== null && (
              <div className={`text-xs ${daysRemaining <= 7 ? "text-red-500" : "text-gray-500"}`}>
                {daysRemaining > 0
                  ? `${daysRemaining} ${locale === 'ar' ? 'أيام متبقية' : 'days left'}`
                  : locale === 'ar' ? 'منتهية' : 'Expired'
                }
              </div>
            )}
          </div>
        ) : (
          <span className="text-sm text-gray-400">
            {locale === 'ar' ? 'لا يوجد موعد نهائي' : 'No deadline'}
          </span>
        )}
      </td>

      {/* View Button */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <Link href={`/${locale}/tenders/${tender._id}`}>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
            <Eye className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
            {dict.tenders?.details?.view || dict.common?.view || "View"}
          </Button>
        </Link>
      </td>
    </tr>
  )
}
