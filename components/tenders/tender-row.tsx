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
    <div className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors">
      {/* Published Date */}
      <div className="col-span-1 text-sm text-gray-600">
        {formatDate(displayDate, locale, { month: "short", day: "numeric" })}
      </div>

      {/* Organization Logo */}
      <div className="col-span-1">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt={tender.organization || "Organization"}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Tender Title */}
      <div className="col-span-4">
        <div className="space-y-1">
          <Link
            href={`/${locale}/tenders/${tender._id}`}
            className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            {tender.title}
          </Link>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm text-gray-600">{tender.organization || "Organization"}</span>
            {tender.category && (
              <Badge className={`${getTenderTypeColor(tender.category)} text-xs`}>
                {dict.tenders?.types?.[tender.category] || tender.category}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="col-span-2 text-sm text-gray-600">{tender.location}</div>

      {/* Deadline */}
      <div className="col-span-2 text-sm">
        {deadlineDate ? (
          <div className="space-y-1">
            <div className={daysRemaining && daysRemaining <= 7 ? "text-red-600 font-medium" : "text-gray-600"}>
              {formatDate(deadlineDate, locale, { month: "short", day: "numeric" })}
            </div>
            {daysRemaining !== null && (
              <div className={`text-xs ${daysRemaining <= 7 ? "text-red-500" : "text-gray-500"}`}>
                {daysRemaining > 0 ? `${daysRemaining} days left` : "Expired"}
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-400">No deadline</span>
        )}
      </div>

      {/* Actions */}
      <div className="col-span-2 flex items-center space-x-2 rtl:space-x-reverse">
        <Link href={`/${locale}/tenders/${tender._id}`}>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        </Link>
        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <ExternalLink className="w-4 h-4 mr-1" />
          Apply
        </Button>
      </div>
    </div>
  )
}
