"use client"

import { TenderRow } from "./tender-row"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AlertCircle, Search, Filter, Building2, MapPin, Calendar, Tag, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import type { TendersResponse } from "@/lib/server-api"
import { Pagination } from "@/components/ui/pagination"

interface TendersListingProps {
  locale: string
  dict: any
  initialData: TendersResponse
  searchParams: { [key: string]: string | string[] | undefined }
}

export function TendersListing({ locale, dict, initialData, searchParams }: TendersListingProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState((searchParams.search as string) || "")
  // Remove category extraction and filter logic
  // Add state for desktop view toggle
  const [desktopView, setDesktopView] = useState<'table' | 'cards'>('table')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    router.push(`/${locale}/tenders?${params.toString()}`)
  }

  const activeTendersCount = initialData.total
  const recentTendersCount = initialData.tenders.filter((tender) => {
    const tenderDate = new Date(tender.publishedAt || tender.createdAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return tenderDate >= weekAgo
  }).length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{activeTendersCount}</div>
              <div className="text-sm text-gray-600">active tenders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{recentTendersCount}</div>
              <div className="text-sm text-gray-600">last 7 days</div>
            </div>
          </div>

          {/* <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tenders or organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleSearch}>
              <Filter className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div> */}
        </div>
        {/* Category Filters removed */}
      </div>

      {/* Desktop view toggle */}
      <div className="hidden sm:flex justify-end items-center gap-2">
        <button
          className={`px-3 py-1 rounded-md border text-sm font-medium transition-colors ${desktopView === 'table' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          onClick={() => setDesktopView('table')}
        >
          Table
        </button>
        <button
          className={`px-3 py-1 rounded-md border text-sm font-medium transition-colors ${desktopView === 'cards' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          onClick={() => setDesktopView('cards')}
        >
          Cards
        </button>
      </div>

      {/* Tenders Table - hidden on small screens, shown on desktop if table view is selected */}
      {desktopView === 'table' && (
        <div className="hidden sm:block bg-white rounded-lg shadow-sm border overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
            <div className="col-span-1">Published</div>
            <div className="col-span-1">Organization</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Deadline</div>
            <div className="col-span-2">Actions</div>
          </div>
          {/* Tenders List */}
          <div className="divide-y divide-gray-100">
            {initialData.tenders.length > 0 ? (
              initialData.tenders.map((tender) => (
                <TenderRow key={tender._id} tender={tender} locale={locale} dict={dict} />
              ))
            ) : (
              <div className="text-center py-16">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tenders found</h3>
                <p className="text-gray-600">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "No tenders are currently available"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card view - always on mobile, on desktop if cards view is selected */}
      <div className={`${desktopView === 'cards' ? 'sm:block' : 'sm:hidden'} space-y-4`}>
        {initialData.tenders.map((tender) => {
          // Determine if tender is new (posted in last 3 days)
          const postedDate = new Date(tender.publishedAt || tender.createdAt)
          const now = new Date()
          const isNew = (now.getTime() - postedDate.getTime()) < 3 * 24 * 60 * 60 * 1000
          const deadlineDate = tender.deadline ? new Date(tender.deadline) : null
          const daysRemaining = deadlineDate ? Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null
          return (
            <div
              key={tender._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-200 p-0 overflow-hidden group"
            >
              {/* Header/title area */}
              <div className="flex items-center justify-between px-5 pt-5 pb-2 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors">{tender.title}</span>
                </div>
                {isNew && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200 animate-pulse">new</span>
                )}
              </div>
              {/* Main content */}
              <div className="px-5 pb-5 pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <Building2 className="w-4 h-4 text-green-400" />
                  <span className="font-medium">{tender.organization}</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>{tender.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Published: {postedDate.toLocaleDateString(locale === 'ar' ? 'ar-YE' : 'en-US', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
                  {tender.category && (
                    <span className="flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold"><Tag className="w-3 h-3" />{tender.category}</span>
                  )}
                </div>
                {tender.budget && (
                  <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
                    <span>Budget:</span>
                    <span>{tender.budget}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Deadline: {deadlineDate ? deadlineDate.toLocaleDateString(locale === 'ar' ? 'ar-YE' : 'en-US', { day: '2-digit', month: 'short', year: '2-digit' }) : 'N/A'}</span>
                  {daysRemaining !== null && (
                    <span className={`ml-2 ${daysRemaining <= 7 ? 'text-red-500' : 'text-gray-500'}`}>{daysRemaining > 0 ? `${daysRemaining} days left` : 'Expired'}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <a href={`/${locale}/tenders/${tender._id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow hover:from-green-600 hover:to-blue-600 transition-all">
                      {dict.tenders?.details?.submit || 'Apply'}
                    </Button>
                  </a>
                  <a href={`/${locale}/tenders/${tender._id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-gray-300 text-blue-700 font-semibold hover:bg-blue-50">
                      {dict.tenders?.details?.view || 'View'}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {/* {initialData.total > initialData.limit && (
        <div className="flex items-center justify-center mt-6">
          <Pagination
            currentPage={initialData.page}
            totalPages={Math.ceil(initialData.total / initialData.limit)}
            onPageChange={(page) => {
              const params = new URLSearchParams()
              if (searchQuery) params.set("search", searchQuery)
              params.set("page", page.toString())
              router.push(`/${locale}/tenders?${params.toString()}`)
            }}
            className="justify-center"
          />
        </div>
      )} */}
    </div>
  )
}
