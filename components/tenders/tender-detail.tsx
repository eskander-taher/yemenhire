"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, DollarSign, Building, ExternalLink, FileText, Clock, Mail } from "lucide-react"
import { formatDate, formatRelativeTime } from "@/lib/utils"
import Link from "next/link"
import type { Tender } from "@/lib/server-api"

interface TenderDetailProps {
  tender: Tender
  locale: string
  dict: any
}

export function TenderDetail({ tender, locale, dict }: TenderDetailProps) {
  const displayDate = tender.publishedAt || tender.createdAt
  const hasDocuments = tender.documents && tender.documents.length > 0

  const getDaysRemaining = (deadline?: string) => {
    if (!deadline) return null
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysRemaining(tender.deadline)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href={`/${locale}/tenders`}>
          <Button variant="ghost" className="flex items-center space-x-2 rtl:space-x-reverse hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" />
            <span>{dict.common.back}</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 leading-tight">{tender.title}</h1>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {tender.category && <Badge className="bg-green-100 text-green-800">{tender.category}</Badge>}
                    {hasDocuments && (
                      <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse">
                        <FileText className="w-3 h-3" />
                        <span>{tender.documents?.length} docs</span>
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Building className="w-5 h-5" />
                    <span className="font-medium">{tender.organization}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <MapPin className="w-5 h-5" />
                    <span>{tender.location}</span>
                  </div>
                  {tender.budget && (
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-green-600">{tender.budget}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Clock className="w-5 h-5" />
                    <span>{formatRelativeTime(displayDate, locale)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tender Description</h2>
                <div className="prose max-w-none text-gray-700">
                  {tender.description ? (
                    tender.description.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No description available.</p>
                  )}
                </div>
              </div>

              {/* Instructions */}
              {tender.instructions && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Submission Instructions</h2>
                  <div className="prose max-w-none text-gray-700">
                    <div className="whitespace-pre-wrap">{tender.instructions}</div>
                  </div>
                </div>
              )}

              {/* Documents */}
              {hasDocuments && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
                  <div className="grid gap-3">
                    {tender.documents?.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg"
                      >
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {tender.contactEmail && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-amber-800">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${tender.contactEmail}`} className="hover:underline">
                        {tender.contactEmail}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-xl border-0">
            <CardContent className="p-6">
              {/* Submit Button */}
              {tender.contactEmail ? (
                <a href={`mailto:${tender.contactEmail}?subject=Tender Submission for ${tender.title}`}>
                  <Button
                    className="w-full mb-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    size="lg"
                  >
                    <Mail className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    Submit via Email
                  </Button>
                </a>
              ) : (
                <Button
                  className="w-full mb-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  size="lg"
                >
                  <ExternalLink className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  Submit Proposal
                </Button>
              )}

              {/* Tender Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Tender Details</h3>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Organization</span>
                  <span className="font-medium">{tender.organization}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{tender.location}</span>
                </div>

                {tender.category && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{tender.category}</span>
                  </div>
                )}

                {tender.budget && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium text-green-600">{tender.budget}</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Published</span>
                  <span className="font-medium">{formatDate(displayDate, locale)}</span>
                </div>

                {tender.deadline && (
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600">Deadline</span>
                    <span
                      className={`font-medium ${daysRemaining && daysRemaining <= 7 ? "text-red-600" : "text-gray-900"}`}
                    >
                      {formatDate(tender.deadline, locale)}
                    </span>
                  </div>
                )}
              </div>

              {/* Time Remaining */}
              {daysRemaining !== null && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold mb-2 ${daysRemaining <= 7 ? "text-red-600" : "text-green-600"}`}
                    >
                      {daysRemaining > 0 ? daysRemaining : 0}
                    </div>
                    <p className="text-sm text-gray-600">
                      {daysRemaining > 0 ? "Days left to submit" : "Submission deadline passed"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
