"use client"

import { TenderRow } from "./tender-row"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { AlertCircle, Search, Filter, MapPin, Calendar, Tag, Sparkles } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const normalizeCategory = (value?: string) => {
    const v = (value || "").toLowerCase().trim()
    if (!v) return ""
    const pairs: Array<[string, string[]]> = [
      ["construction", ["construction", "البناء", "البناء والتشييد"]],
      ["consulting", ["consulting", "الاستشارات"]],
      ["healthcare", ["healthcare", "الصحة", "الرعاية الصحية"]],
      ["education", ["education", "التعليم"]],
      ["transportation", ["transportation", "logistics", "النقل", "النقل والمواصلات"]],
      ["security", ["security", "الأمن"]],
      ["it", ["it services", "it", "الخدمات التقنية", "تقنية المعلومات"]],
      ["other", ["other", "misc", "miscellaneous", "أخرى"]],
    ]
    for (const [key, variants] of pairs) {
      if (variants.some((s) => v === s)) return key
    }
    return v
  }

  const categoryLabel = (key: string) => {
    const labels: Record<string, { en: string; ar: string }> = {
      construction: { en: "Construction", ar: "البناء والتشييد" },
      consulting: { en: "Consulting", ar: "الاستشارات" },
      healthcare: { en: "Healthcare", ar: "الرعاية الصحية" },
      education: { en: "Education", ar: "التعليم" },
      transportation: { en: "Transportation", ar: "النقل والمواصلات" },
      security: { en: "Security", ar: "الأمن" },
      it: { en: "IT Services", ar: "الخدمات التقنية" },
      other: { en: "Other", ar: "أخرى" },
    }
    const l = labels[key]
    if (l) return locale === "ar" ? l.ar : l.en
    return key
  }

  const [filters, setFilters] = useState({
    search: (searchParams.search as string) || "",
    category: normalizeCategory(searchParams.category as string) || "",
    location: (searchParams.location as string) || "",
    city: (searchParams.city as string) || "",
    organization: (searchParams.organization as string) || "",
  })
  // Add state for desktop view toggle
  const [desktopView, setDesktopView] = useState<'table' | 'cards'>('table')

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)

    // Update URL with new filters
    const params = new URLSearchParams()
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    router.push(`/${locale}/tenders?${params.toString()}`)
  }

  // Extract unique categories, cities and organizations from tenders data
  const uniqueCategories = Array.from(new Set(initialData.tenders.map(tender => normalizeCategory(tender.category)).filter(Boolean)))
  const uniqueCities = Array.from(new Set(initialData.tenders.map(tender => tender.location).filter(Boolean)))
  const uniqueOrganizations = Array.from(new Set(initialData.tenders.map(tender => tender.organization).filter(Boolean)))

  // Create category map for counts
  const categoryMap = initialData.tenders.reduce((acc, tender) => {
    const key = normalizeCategory(tender.category)
    if (key) acc[key] = (acc[key] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const categories = Object.entries(categoryMap).map(([id, count]) => ({ id, name: categoryLabel(id), count }))

  // Filter tenders on the frontend based on selected filters
  const filteredTenders = initialData.tenders.filter(tender => {
    if (filters.category && normalizeCategory(tender.category) !== filters.category) return false
    if (filters.city && filters.city !== 'all' && tender.location !== filters.city) return false
    if (filters.organization && filters.organization !== 'all' && tender.organization !== filters.organization) return false
    return true
  })

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
        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{dict.tenders.filters.category}</label>
              <Select value={filters.category || "all"} onValueChange={(value) => handleFilterChange({ category: value === "all" ? "" : value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{dict.tenders.filters.city}</label>
              <Select value={filters.city || "all"} onValueChange={(value) => handleFilterChange({ city: value === "all" ? "" : value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {uniqueCities.map((city) => {
                    const cityTenderCount = initialData.tenders.filter(tender => tender.location === city).length
                    return (
                      <SelectItem key={city} value={city}>
                        {city} ({cityTenderCount})
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Organization Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{dict.tenders.filters.organization}</label>
              <Select value={filters.organization || "all"} onValueChange={(value) => handleFilterChange({ organization: value === "all" ? "" : value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Organizations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  {uniqueOrganizations.map((org) => {
                    const orgTenderCount = initialData.tenders.filter(tender => tender.organization === org).length
                    return (
                      <SelectItem key={org} value={org}>
                        {org} ({orgTenderCount})
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => handleFilterChange({ search: "", category: "", location: "", city: "", organization: "" })}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop view toggle */}
      <div className="hidden sm:flex justify-end items-center gap-2">
        <button
          className={`px-3 py-1 rounded-md border text-sm font-medium transition-colors ${desktopView === 'table' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          onClick={() => setDesktopView('table')}
        >
          {dict.common?.table || "Table"}
        </button>
        <button
          className={`px-3 py-1 rounded-md border text-sm font-medium transition-colors ${desktopView === 'cards' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          onClick={() => setDesktopView('cards')}
        >
          {dict.common?.cards || "Cards"}
        </button>
      </div>

      {/* Tenders Table - hidden on small screens, shown on desktop if table view is selected */}
      {desktopView === 'table' && (
        <div className="hidden sm:block bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y divide-gray-200 ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className={`px-6 py-3 ${locale === 'ar' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    {dict.common?.posted || "Posted"}
                  </th>
                  <th scope="col" className={`px-6 py-3 ${locale === 'ar' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    {dict.tenders?.details?.organization || "Organization"}
                  </th>
                  <th scope="col" className={`px-6 py-3 ${locale === 'ar' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    {dict.tenders?.title || "Title"}
                  </th>
                  <th scope="col" className={`px-6 py-3 ${locale === 'ar' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    {dict.tenders?.details?.location || "Location"}
                  </th>
                  <th scope="col" className={`px-6 py-3 ${locale === 'ar' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    {dict.tenders?.details?.deadline || "Deadline"}
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dict.common?.view || "View"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {initialData.tenders.length > 0 ? (
                  filteredTenders.map((tender) => (
                    <TenderRow key={tender._id} tender={tender} locale={locale} dict={dict} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-16">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {dict.common?.noResults || "No tenders found"}
                      </h3>
                      <p className="text-gray-600">
                        {filters.search || filters.category || filters.city || filters.organization
                          ? dict.common?.retry || "Try adjusting your search criteria"
                          : "No tenders are currently available"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Card view - always on mobile, on desktop if cards view is selected */}
      <div className={`${desktopView === 'cards' ? 'sm:block' : 'sm:hidden'} space-y-4`}>
        {filteredTenders.map((tender) => {
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
                  <a href={`/${locale}/tenders/${tender._id}`} className="text-lg font-extrabold text-gray-900 hover:text-blue-700 transition-colors cursor-pointer">
                    {tender.title}
                  </a>
                </div>
                {isNew && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200 animate-pulse">new</span>
                )}
              </div>
              {/* Main content */}
              <div className="px-5 pb-5 pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
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
      {initialData.total > initialData.limit && (
        <div className="flex items-center justify-center mt-6">
          <Pagination
            currentPage={initialData.page}
            totalPages={Math.ceil(initialData.total / initialData.limit)}
            onPageChange={(page) => {
              const params = new URLSearchParams()
              Object.entries(filters).forEach(([key, value]) => {
                if (value) params.set(key, value)
              })
              params.set("page", page.toString())
              router.push(`/${locale}/tenders?${params.toString()}`)
            }}
            className="justify-center"
          />
        </div>
      )}
    </div>
  )
}
