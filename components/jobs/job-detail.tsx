"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, DollarSign, Building2, Bookmark, Share2, ExternalLink, FileText, Mail, Download, Briefcase } from "lucide-react"
import type { Job } from "@/lib/server-api"
import { useRelatedJobs } from "@/hooks/useJobs"
import { RelatedJobCard } from "./related-job-card"
import Link from "next/link"

interface JobDetailProps {
  job: Job
  locale: string
  dict: any
}

export function JobDetail({ job, locale, dict }: JobDetailProps) {
  const { data: relatedJobsData, isLoading: relatedJobsLoading } = useRelatedJobs(job)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === "ar" ? "ar-YE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDownload = (filename: string, index: number) => {
    const link = document.createElement('a')
    link.href = filename
    link.download = `document-${index + 1}`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{job.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {job.organization}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {dict.jobs?.details?.posted || "Posted"} {formatDate(job.publishedAt || job.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {job.category && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {job.category}
                      </Badge>
                    )}
                    {job.salary && (
                      <Badge variant="outline">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {job.salary}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>{dict.jobs?.details?.jobDescription || "Job Description"}</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div
                className={`text-gray-700 leading-relaxed ${locale === 'ar' ? 'rtl-text' : 'ltr-text'}`}
                dangerouslySetInnerHTML={{ __html: job.description || '' }}
              />
            </CardContent>
          </Card>

          {/* Application Instructions */}
          {job.instructions && (
            <Card>
              <CardHeader>
                <CardTitle>{dict.jobs?.details?.applicationInstructions || "Application Instructions"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-gray-700 leading-relaxed ${locale === 'ar' ? 'rtl-text' : 'ltr-text'}`}
                  dangerouslySetInnerHTML={{ __html: job.instructions || '' }}
                />
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          {job.documents && job.documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{dict.jobs?.details?.documents || "Documents"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {job.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700 font-medium">{dict.jobs?.details?.document || "Document"} {index + 1}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(doc, index)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        {dict.jobs?.details?.download || "Download"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          {job.contactEmail && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-800">{dict.jobs?.details?.contactInfo || "Contact Information"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-amber-800">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${job.contactEmail}`} className="hover:underline">
                    {job.contactEmail}
                  </a>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key Guidelines */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                {dict.jobs.guidelines.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dict.jobs.guidelines.items.map((guideline: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className={`text-blue-900 leading-relaxed ${locale === 'ar' ? 'rtl-text' : 'ltr-text'}`}>
                      {guideline}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">{job.organization}</CardTitle>
              <p className="text-sm text-gray-600">{job.category || dict.jobs?.details?.organization || "Organization"}</p>
            </CardHeader>
          </Card>

          {/* Related Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  {dict.jobs.relatedJobs.title}
                </div>
                <Link href={`/${locale}/jobs`} className="text-sm text-blue-600 hover:text-blue-800">
                  {dict.jobs.relatedJobs.viewAll}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {relatedJobsLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg animate-pulse">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="flex justify-between">
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : relatedJobsData?.jobs && relatedJobsData.jobs.length > 0 ? (
                <div className="space-y-3">
                  {relatedJobsData.jobs.map((relatedJob) => (
                    <RelatedJobCard
                      key={relatedJob._id}
                      job={relatedJob}
                      locale={locale}
                      dict={dict}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">{dict.jobs.relatedJobs.noRelated}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Time Remaining */}
          {daysRemaining !== null && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{dict.jobs?.details?.timeRemaining || "Time Remaining"}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className={`text-3xl font-bold mb-2 ${daysRemaining <= 7 ? "text-red-600" : "text-green-600"}`}>
                  {daysRemaining > 0 ? daysRemaining : 0}
                </div>
                <p className="text-sm text-gray-600">
                  {daysRemaining > 0 ? (dict.jobs?.details?.daysLeft || "Days left to apply") : (dict.jobs?.details?.deadlinePassed || "Application deadline passed")}
                </p>
                {job.deadline && <p className="text-xs text-gray-500 mt-2">{dict.jobs?.details?.deadlineLabel || "Deadline"}: {formatDate(job.deadline)}</p>}
              </CardContent>
            </Card>
          )}

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>{dict.jobs?.details?.jobDetails || "Job Details"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">{dict.jobs?.details?.organization || "Organization"}</span>
                <span className="font-medium">{job.organization}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">{dict.jobs?.details?.location || "Location"}</span>
                <span className="font-medium">{job.location}</span>
              </div>

              {job.category && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">{dict.jobs?.details?.category || "Category"}</span>
                  <span className="font-medium">{job.category}</span>
                </div>
              )}

              {job.salary && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">{dict.jobs?.details?.salary || "Salary"}</span>
                  <span className="font-medium text-green-600">{job.salary}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">{dict.jobs?.details?.published || "Published"}</span>
                <span className="font-medium">{formatDate(job.publishedAt || job.createdAt)}</span>
              </div>

              {job.deadline && (
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">{dict.jobs?.details?.deadlineLabel || "Deadline"}</span>
                  <span
                    className={`font-medium ${daysRemaining && daysRemaining <= 7 ? "text-red-600" : "text-gray-900"}`}
                  >
                    {formatDate(job.deadline)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save & Share */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Save & Share</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent">
                <Bookmark className="w-4 h-4 mr-2" />
                Save Job
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share this Job
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  )
}
