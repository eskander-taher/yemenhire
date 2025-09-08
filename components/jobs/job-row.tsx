"use client"

import type { Job } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ExternalLink, Calendar, MapPin, Building2 } from "lucide-react"
import Link from "next/link"

interface JobRowProps {
  job: Job
  locale: string
  dict: any
}

export function JobRow({ job, locale, dict }: JobRowProps) {
  const isRTL = locale === "ar"

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === "ar" ? "ar-YE" : "en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getDaysRemaining = (deadline?: string) => {
    if (!deadline) return null
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysRemaining(job.deadline)
  const isUrgent = daysRemaining !== null && daysRemaining <= 7

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Posted Date */}
      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-sm text-gray-900">{formatDate(job.publishedAt || job.createdAt)}</div>
      </td>

      {/* Organization */}
      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center ${isRTL ? ' justify-end' : 'justify-start'}`}>
      
          <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
            <div className="text-sm font-medium text-gray-900">{job.organization}</div>
          </div>
        </div>
      </td>

      {/* Title */}
      <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <Link
          href={`/${locale}/jobs/${job._id}`}
          className="text-md font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
        >
          {job.title}
        </Link>
      </td>

      {/* Location */}
      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center text-sm text-gray-900 ${isRTL ? '' : ''}`}>
          <MapPin className={`h-4 w-4 text-gray-400 ${isRTL ? 'ml-1' : 'mr-1'}`} />
          {job.location}
        </div>
      </td>

      {/* Deadline */}
      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
        {job.deadline ? (
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Calendar className={`h-4 w-4 text-gray-400 ${isRTL ? 'ml-1' : 'mr-1'}`} />
            <span className={`text-sm ${isUrgent ? "text-red-600 font-medium" : "text-gray-900"}`}>
              {formatDate(job.deadline)}
            </span>
            {daysRemaining !== null && (
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-xs ${isUrgent ? "text-red-500" : "text-gray-500"}`}>
                ({daysRemaining}{locale === 'ar' ? 'ي' : 'd'})
              </span>
            )}
          </div>
        ) : (
          <span className="text-sm text-gray-400">{dict.common?.noResults || "No deadline"}</span>
        )}
      </td>

      {/* View Button */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <Link href={`/${locale}/jobs/${job._id}`}>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
            <Eye className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
            {dict.jobs?.details?.view || "View"}
          </Button>
        </Link>
      </td>
    </tr>
  )
}
