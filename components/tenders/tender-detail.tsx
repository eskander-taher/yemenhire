"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, DollarSign, Building2, ExternalLink, FileText, Clock, Mail, Download, Bookmark, Share2, Calendar } from "lucide-react"
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

  const daysRemaining = getDaysRemaining(tender.deadline)


  return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Back Button */}
			<div className="mb-6">
				<Link href={`/${locale}/tenders`}>
					<Button
						variant="ghost"
						className="flex items-center space-x-2 hover:bg-gray-100"
					>
						<ArrowLeft className="w-4 h-4" />
						<span>{dict.tenders?.details?.backToTenders || "Back to Tenders"}</span>
					</Button>
				</Link>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Tender Header */}
					<Card>
						<CardHeader>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<CardTitle className="text-2xl font-bold text-gray-900 mb-2">
										{tender.title}
									</CardTitle>
									<div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
										<div className="flex items-center">
											<Building2 className="w-4 h-4 mr-1" />
											{tender.organization}
										</div>
										<div className="flex items-center">
											<MapPin className="w-4 h-4 mr-1" />
											{tender.location}
										</div>
									<div className="flex items-center">
										<Calendar className="w-4 h-4 mr-1" />
										{dict.tenders?.details?.posted || "Published"} {formatDate(displayDate)}
									</div>
									</div>
									<div className="flex items-center space-x-2">
										{tender.category && (
											<Badge
												variant="secondary"
												className="bg-green-100 text-green-800"
											>
												{tender.category}
											</Badge>
										)}
										{tender.budget && (
											<Badge variant="outline">
												<DollarSign className="w-3 h-3 mr-1" />
												{tender.budget}
											</Badge>
										)}
									</div>
								</div>
							</div>
						</CardHeader>
					</Card>

					{/* Tender Description */}
					<Card>
						<CardHeader>
							<CardTitle>{dict.tenders?.details?.tenderDescription || "Tender Description"}</CardTitle>
						</CardHeader>
						<CardContent className="prose max-w-none">
							<div
								className={`text-gray-700 leading-relaxed ${
									locale === "ar" ? "rtl-text" : "ltr-text"
								}`}
								dangerouslySetInnerHTML={{ __html: tender.description || "" }}
							/>
						</CardContent>
					</Card>

					{/* Submission Instructions */}
					{tender.instructions && (
						<Card>
							<CardHeader>
								<CardTitle>{dict.tenders?.details?.submissionInstructions || "Submission Instructions"}</CardTitle>
							</CardHeader>
							<CardContent>
								<div
									className={`text-gray-700 leading-relaxed prose  ${
										locale === "ar" ? "rtl-text" : "ltr-text"
									}`}
									dangerouslySetInnerHTML={{ __html: tender.instructions || "" }}
								/>
							</CardContent>
						</Card>
					)}

					{/* Documents */}
					{hasDocuments && (
						<Card>
							<CardHeader>
								<CardTitle>{dict.tenders?.details?.documents || "Documents"}</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-3">
									{tender.documents?.map((doc, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
										>
											<div className="flex items-center space-x-3">
												<FileText className="w-5 h-5 text-green-600" />
												<span className="text-gray-700 font-medium">
													{dict.tenders?.details?.document || "Document"} {index + 1}
												</span>
											</div>

											<a
												href={doc}
												download={`document-${index + 1}`}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Button
													size="sm"
													variant="outline"
													className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
												>
													<Download className="w-4 h-4 mr-1" />
													{dict.tenders?.details?.download || "Download"}
												</Button>
											</a>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{/* Contact Information */}
					{tender.contactEmail && (
						<Card className="border-amber-200 bg-amber-50">
							<CardHeader>
								<CardTitle className="text-amber-800">
									{dict.tenders?.details?.contactInfo || "Contact Information"}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center space-x-2 text-amber-800">
									<Mail className="w-4 h-4" />
									<a
										href={`mailto:${tender.contactEmail}`}
										className="hover:underline"
									>
										{tender.contactEmail}
									</a>
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Organization Info */}
					<Card>
						<CardHeader className="text-center">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
								<Building2 className="w-8 h-8 text-green-600" />
							</div>
						<CardTitle className="text-lg">{tender.organization}</CardTitle>
						<p className="text-sm text-gray-600">
							{tender.category || dict.tenders?.details?.organization || "Organization"}
						</p>
						</CardHeader>
					</Card>

					{/* Tender Submission */}
					<Card>
						<CardHeader>
							<CardTitle className="text-center">{dict.tenders?.details?.tenderSubmission || "Tender Submission"}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-sm text-gray-600 text-center">
								{dict.tenders?.details?.submitProposal || "Click the button below to submit your proposal"}
							</p>
							{tender.contactEmail ? (
								<a
									href={`mailto:${tender.contactEmail}?subject=Tender Submission for ${tender.title}`}
								>
									<Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
										<Mail className="w-4 h-4 mr-2" />
										{dict.tenders?.details?.submitViaEmail || "Submit via Email"}
									</Button>
								</a>
							) : (
								<Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
									<ExternalLink className="w-4 h-4 mr-2" />
									{dict.tenders?.details?.submitNow || "Submit Now"}
								</Button>
							)}
						</CardContent>
					</Card>

					{/* Time Remaining */}
					{daysRemaining !== null && (
						<Card>
							<CardHeader>
								<CardTitle className="text-center">{dict.tenders?.details?.timeRemaining || "Time Remaining"}</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<div
									className={`text-3xl font-bold mb-2 ${
										daysRemaining <= 7 ? "text-red-600" : "text-green-600"
									}`}
								>
									{daysRemaining > 0 ? daysRemaining : 0}
								</div>
								<p className="text-sm text-gray-600">
									{daysRemaining > 0
										? (dict.tenders?.details?.daysLeftToSubmit || "Days left to submit")
										: (dict.tenders?.details?.deadlinePassed || "Submission deadline passed")}
								</p>
								{tender.deadline && (
									<p className="text-xs text-gray-500 mt-2">
										{dict.tenders?.details?.deadlineLabel || "Deadline"}: {formatDate(tender.deadline)}
									</p>
								)}
							</CardContent>
						</Card>
					)}

					{/* Tender Details */}
					<Card>
						<CardHeader>
							<CardTitle>{dict.tenders?.details?.tenderDetails || "Tender Details"}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between py-3 border-b border-gray-100">
								<span className="text-gray-600">{dict.tenders?.details?.organization || "Organization"}</span>
								<span className="font-medium">{tender.organization}</span>
							</div>

							<div className="flex items-center justify-between py-3 border-b border-gray-100">
								<span className="text-gray-600">{dict.tenders?.details?.location || "Location"}</span>
								<span className="font-medium">{tender.location}</span>
							</div>

							{tender.category && (
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600">{dict.tenders?.details?.category || "Category"}</span>
									<span className="font-medium">{tender.category}</span>
								</div>
							)}

							{tender.budget && (
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600">{dict.tenders?.details?.budget || "Budget"}</span>
									<span className="font-medium text-green-600">
										{tender.budget}
									</span>
								</div>
							)}

							<div className="flex items-center justify-between py-3 border-b border-gray-100">
								<span className="text-gray-600">{dict.tenders?.details?.published || "Published"}</span>
								<span className="font-medium">{formatDate(displayDate)}</span>
							</div>

							{tender.deadline && (
								<div className="flex items-center justify-between py-3">
									<span className="text-gray-600">{dict.tenders?.details?.deadlineLabel || "Deadline"}</span>
									<span
										className={`font-medium ${
											daysRemaining && daysRemaining <= 7
												? "text-red-600"
												: "text-gray-900"
										}`}
									>
										{formatDate(tender.deadline)}
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
                Save Tender
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share this Tender
              </Button>
            </CardContent>
          </Card> */}
				</div>
			</div>
		</div>
  );
}
