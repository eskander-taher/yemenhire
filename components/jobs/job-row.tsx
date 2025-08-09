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
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatDate(job.publishedAt || job.createdAt)}</div>
      </td>

      {/* Organization */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{job.organization}</div>
          </div>
        </div>
      </td>

      {/* Title */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 mb-1">{job.title}</div>
        <div className="flex items-center space-x-2">
          {job.category && (
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
              {job.category}
            </Badge>
          )}
          {job.salary && <span className="text-xs text-gray-600">{job.salary}</span>}
        </div>
      </td>

      {/* Location */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-900">
          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
          {job.location}
        </div>
      </td>

      {/* Deadline */}
      <td className="px-6 py-4 whitespace-nowrap">
        {job.deadline ? (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span className={`text-sm ${isUrgent ? "text-red-600 font-medium" : "text-gray-900"}`}>
              {formatDate(job.deadline)}
            </span>
            {daysRemaining !== null && (
              <span className={`ml-2 text-xs ${isUrgent ? "text-red-500" : "text-gray-500"}`}>({daysRemaining}d)</span>
            )}
          </div>
        ) : (
          <span className="text-sm text-gray-400">No deadline</span>
        )}
      </td>

      {/* View Button */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <Link href={`/${locale}/jobs/${job._id}`}>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </td>

      {/* Apply Button */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <Link href={`/${locale}/jobs/${job._id}`}>
          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
            <ExternalLink className="h-4 w-4 mr-1" />
            Apply
          </Button>
        </Link>
      </td>
    </tr>
  )
}
