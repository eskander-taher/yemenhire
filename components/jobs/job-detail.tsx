"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, DollarSign, Building2, Bookmark, Share2, ExternalLink, FileText, Mail } from "lucide-react"
import type { Job } from "@/lib/server-api"

interface JobDetailProps {
  job: Job
  locale: string
  dict: any
}

export function JobDetail({ job, locale, dict }: JobDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === "ar" ? "ar-YE" : "en-US", {
      year: "numeric",
      month: "long",
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
                      Posted {formatDate(job.publishedAt || job.createdAt)}
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
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{job.description}</div>
            </CardContent>
          </Card>

          {/* Application Instructions */}
          {job.instructions && (
            <Card>
              <CardHeader>
                <CardTitle>Application Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{job.instructions}</div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          {job.documents && job.documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {job.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg"
                    >
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{doc}</span>
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
                <CardTitle className="text-amber-800">Contact Information</CardTitle>
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
              <p className="text-sm text-gray-600">{job.category || "Organization"}</p>
            </CardHeader>
          </Card>

          {/* Job Application */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Job Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 text-center">Click the button below to apply for this position</p>
              {job.contactEmail ? (
                <a href={`mailto:${job.contactEmail}?subject=Application for ${job.title}`}>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                    <Mail className="w-4 h-4 mr-2" />
                    Apply via Email
                  </Button>
                </a>
              ) : (
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Time Remaining */}
          {daysRemaining !== null && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Time Remaining</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className={`text-3xl font-bold mb-2 ${daysRemaining <= 7 ? "text-red-600" : "text-green-600"}`}>
                  {daysRemaining > 0 ? daysRemaining : 0}
                </div>
                <p className="text-sm text-gray-600">
                  {daysRemaining > 0 ? "Days left to apply" : "Application deadline passed"}
                </p>
                {job.deadline && <p className="text-xs text-gray-500 mt-2">Deadline: {formatDate(job.deadline)}</p>}
              </CardContent>
            </Card>
          )}

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Organization</span>
                <span className="font-medium">{job.organization}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Location</span>
                <span className="font-medium">{job.location}</span>
              </div>

              {job.category && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{job.category}</span>
                </div>
              )}

              {job.salary && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Salary</span>
                  <span className="font-medium text-green-600">{job.salary}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Published</span>
                <span className="font-medium">{formatDate(job.publishedAt || job.createdAt)}</span>
              </div>

              {job.deadline && (
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Deadline</span>
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
          <Card>
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
          </Card>
        </div>
      </div>
    </div>
  )
}
