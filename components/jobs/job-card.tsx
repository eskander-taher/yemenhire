import Link from "next/link"
import { MapPin, Calendar, DollarSign, Building, ExternalLink, Clock, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate, formatRelativeTime } from "@/lib/utils"
import type { Job } from "@/lib/api"

interface JobCardProps {
  job: Job
  locale: string
  dict: any
}

export function JobCard({ job, locale, dict }: JobCardProps) {
  const isRTL = locale === "ar"

  const getJobTypeColor = (type?: string) => {
    switch (type) {
      case "full-time":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white"
      case "part-time":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      case "contract":
        return "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
      case "freelance":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    }
  }

  const displayDate = job.publishedAt || job.createdAt
  const hasDocuments = job.documents && job.documents.length > 0

  return (
    <Card className="group hover-lift hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
      <CardContent className="p-0">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600/5 to-purple-600/5 p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                <Link href={`/${locale}/jobs/${job._id}`} className="hover:underline">
                  {job.title}
                </Link>
              </h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600">
                <Building className="w-4 h-4" />
                <span className="font-medium">{job.organization}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {job.category && (
                <Badge className="bg-blue-100 text-blue-800 shadow-lg border-0 px-3 py-1">{job.category}</Badge>
              )}
              {hasDocuments && (
                <div className="flex items-center space-x-1 rtl:space-x-reverse text-blue-600">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-medium">{job.documents?.length}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{job.location}</span>
            </div>
            {job.salary && (
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-600">{job.salary}</span>
              </div>
            )}
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{formatRelativeTime(displayDate, locale)}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
            {job.description || "No description available."}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>
                {dict.common.posted} {formatDate(displayDate, locale)}
              </span>
            </div>

            <Link href={`/${locale}/jobs/${job._id}`}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <span>View Details</span>
                <ExternalLink className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
