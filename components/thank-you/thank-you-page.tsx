"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Briefcase, FileText, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ThankYouPageProps {
  locale: string
  dict: any
  searchParams: { [key: string]: string | string[] | undefined }
}

export function ThankYouPage({ locale, dict, searchParams }: ThankYouPageProps) {
  const [type, setType] = useState<string>("")

  useEffect(() => {
    setType((searchParams.type as string) || "job")
  }, [searchParams])

  const isJob = type === "job"

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{dict.common.thankYou}</h1>
            <p className="text-gray-600">
              Your {isJob ? "job" : "tender"} posting has been submitted successfully and is under review.
            </p>
          </div>

          <div className="space-y-4">
            <Link href={`/${locale}`}>
              <Button className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <Home className="w-4 h-4" />
                <span>Go to Home</span>
              </Button>
            </Link>

            <div className="flex space-x-2 rtl:space-x-reverse">
              <Link href={`/${locale}/jobs`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-transparent"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Browse Jobs</span>
                </Button>
              </Link>

              <Link href={`/${locale}/tenders`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-transparent"
                >
                  <FileText className="w-4 h-4" />
                  <span>Browse Tenders</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
