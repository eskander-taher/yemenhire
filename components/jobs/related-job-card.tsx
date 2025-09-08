"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, DollarSign, Building2 } from "lucide-react"
import type { Job } from "@/lib/server-api"

interface RelatedJobCardProps {
  job: Job
  locale: string
  dict: any
}

export function RelatedJobCard({ job, locale, dict }: RelatedJobCardProps) {
  const formatRelativeTime = (dateString: string, locale: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return locale === "ar" ? "منذ يوم واحد" : "1 day ago"
    } else if (diffDays < 7) {
      return locale === "ar" ? `منذ ${diffDays} أيام` : `${diffDays} days ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return locale === "ar" ? `منذ ${weeks} أسبوع` : `${weeks} week${weeks > 1 ? 's' : ''} ago`
    } else {
      const months = Math.floor(diffDays / 30)
      return locale === "ar" ? `منذ ${months} شهر` : `${months} month${months > 1 ? 's' : ''} ago`
    }
  }

  // Get organization logo color based on organization name
  const getOrgColor = (orgName: string) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-orange-100 text-orange-600',
      'bg-pink-100 text-pink-600',
      'bg-indigo-100 text-indigo-600',
      'bg-yellow-100 text-yellow-600',
      'bg-red-100 text-red-600'
    ]
    const index = orgName.length % colors.length
    return colors[index]
  }

  // Get organization initials
  const getOrgInitials = (orgName: string) => {
    return orgName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  const displayDate = job.publishedAt || job.createdAt

  return (
    <Link href={`/${locale}/jobs/${job._id}`} className="block">
      <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200 bg-white">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          {/* Organization Logo */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${getOrgColor(job.organization)}`}>
            <span className="text-xs font-bold">
              {getOrgInitials(job.organization)}
            </span>
          </div>

          {/* Job Details */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-blue-600 transition-colors mb-1">
              {job.title}
            </h3>

            {/* Organization and Location */}
            <div className="text-xs text-gray-600 mb-2">
              <span className="font-medium">{job.organization}</span>
              <span className="mx-1">•</span>
              <span>{job.location}</span>
            </div>

            {/* Category and Date */}
            <div className="flex items-center justify-between text-xs">
              {job.category && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gray-100">
                  {job.category}
                </Badge>
              )}
              <span className="text-gray-400">
                {formatRelativeTime(displayDate, locale)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
