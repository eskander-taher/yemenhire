import Link from "next/link"
import { MapPin, Calendar, DollarSign, Building } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { Tender } from "@/lib/api"

interface TenderCardProps {
  tender: Tender
  locale: string
  dict: any
}

export function TenderCard({ tender, locale, dict }: TenderCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                <Link href={`/${locale}/tenders/${tender._id}`}>{tender.title}</Link>
              </h3>
              <Badge className="bg-green-100 text-green-800">{tender.category || "Tender"}</Badge>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Building className="w-4 h-4" />
                <span>{tender.organization}</span>
              </div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <MapPin className="w-4 h-4" />
                <span>{tender.location}</span>
              </div>
              {tender.budget && (
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <DollarSign className="w-4 h-4" />
                  <span>{tender.budget}</span>
                </div>
              )}
            </div>

            <p
              className={`text-gray-600 mb-4 overflow-hidden ${locale === 'ar' ? 'rtl-text' : 'ltr-text'}`}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {tender.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>
                  {dict.common.posted} {formatDate(tender.publishedAt || tender.createdAt, locale)}
                </span>
              </div>

              <Link href={`/${locale}/tenders/${tender._id}`}>
                <Button size="sm">{dict.tenders.details.submit}</Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
