"use client"

import { useState } from "react"
import { JobRow } from "./job-row"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import { Search, Calendar, MapPin, Tag, Sparkles, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import type { JobsResponse } from "@/lib/server-api"
import { debounce } from "@/lib/utils"

interface JobsListingProps {
  locale: string
  dict: any
  initialData: JobsResponse
  searchParams: { [key: string]: string | string[] | undefined }
}

export function JobsListing({ locale, dict, initialData, searchParams }: JobsListingProps) {
  const router = useRouter()
  // Category normalization to make filtering language-agnostic
  const normalizeCategory = (value?: string) => {
    const v = (value || "").toLowerCase().trim()
    if (!v) return ""
    const pairs: Array<[string, string[]]> = [
      ["engineering", ["engineering", "engineer", "الهندسة"]],
      ["development", ["development", "software development", "software", "تطوير", "برمجة", "تطوير البرمجيات"]],
      ["education_training", ["education", "training", "education/training", "التعليم", "التعليم/التدريب"]],
      ["healthcare", ["healthcare", "health care", "الصحة", "الرعاية الصحية"]],
      ["finance_accounting", ["finance", "accounting", "finance/accounting", "المالية", "المحاسبة", "المالية/المحاسبة"]],
      ["administration", ["administration", "management", "الإدارة", "ادارة"]],
      ["marketing", ["marketing", "التسويق"]],
      ["sales", ["sales", "المبيعات"]],
      ["construction", ["construction", "البناء", "البناء والتشييد"]],
      ["consulting", ["consulting", "الاستشارات"]],
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
      engineering: { en: "Engineering", ar: "الهندسة" },
      development: { en: "Development", ar: "تطوير" },
      education_training: { en: "Education/Training", ar: "التعليم/التدريب" },
      healthcare: { en: "Healthcare", ar: "الرعاية الصحية" },
      finance_accounting: { en: "Finance/Accounting", ar: "المالية/المحاسبة" },
      administration: { en: "Administration", ar: "الإدارة" },
      marketing: { en: "Marketing", ar: "التسويق" },
      sales: { en: "Sales", ar: "المبيعات" },
      construction: { en: "Construction", ar: "البناء والتشييد" },
      consulting: { en: "Consulting", ar: "الاستشارات" },
      transportation: { en: "Transportation", ar: "النقل والمواصلات" },
      security: { en: "Security", ar: "الأمن" },
      it: { en: "IT Services", ar: "الخدمات التقنية" },
      other: { en: "Other", ar: "أخرى" },
    }
    const l = labels[key]
    if (l) return locale === "ar" ? l.ar : l.en
    // Fallback: show raw but capitalized
    return key
  }

  const [filters, setFilters] = useState({
    search: (searchParams.search as string) || "",
    category: normalizeCategory(searchParams.category as string) || "",
    location: (searchParams.location as string) || "",
    city: (searchParams.city as string) || "",
    organization: (searchParams.organization as string) || "",
    type: (searchParams.type as string) || "",
  })
  // Add state for desktop view toMapPinggle
  const [desktopView, setDesktopView] = useState<'table' | 'cards'>('table')

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)

    // Update URL with new filters
    const params = new URLSearchParams()
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    if (newFilters.category !== undefined) {
      // Debug log for category value
      // eslint-disable-next-line no-console
      console.log('Selected category for filter:', newFilters.category)
    }

    router.push(`/${locale}/jobs?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    params.set("page", page.toString())
    router.push(`/${locale}/jobs?${params.toString()}`)
  }

  // Debounced version of handleFilterChange for search
  const debouncedFilterChange = debounce((newFilters: Partial<typeof filters>) => {
    handleFilterChange(newFilters)
  }, 500)

  // Dynamically extract categories from jobs data (normalized)
  const categoryMap = initialData.jobs.reduce((acc, job) => {
    const key = normalizeCategory(job.category)
    if (key) acc[key] = (acc[key] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const categories = Object.entries(categoryMap).map(([id, count]) => ({ id, name: categoryLabel(id), count }))

  // Extract unique cities and organizations from jobs data
  const uniqueCities = Array.from(new Set(initialData.jobs.map(job => job.location).filter(Boolean)))
  const uniqueOrganizations = Array.from(new Set(initialData.jobs.map(job => job.organization).filter(Boolean)))

  const availableOptions = {
    categories: Array.from(new Set(initialData.jobs.map(job => job.category).filter(Boolean))),
    cities: uniqueCities,
    organizations: uniqueOrganizations
  }

  // Calculate recent jobs count
  const recentJobsCount = initialData.jobs.filter((job) => {
    const jobDate = new Date(job.publishedAt || job.createdAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return jobDate >= weekAgo
  }).length

  // Determine the selected category (from filters or searchParams)
  const selectedCategory = filters.category || "";

  // Filter jobs on the frontend based on selected filters
  const filteredJobs = initialData.jobs.filter(job => {
    if (selectedCategory && normalizeCategory(job.category) !== selectedCategory) return false
    if (filters.city && filters.city !== 'all' && job.location !== filters.city) return false
    if (filters.organization && filters.organization !== 'all' && job.organization !== filters.organization) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Stats and quick filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <span className="text-amber-500 font-bold text-xl">{initialData.total}</span>
            <span className="text-gray-600 ml-2">active jobs</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-600 font-medium">{recentJobsCount}</span>
            <span className="text-gray-600 ml-1">last 7 days</span>
          </div>
        </div>
        {/* <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={dict.jobs?.searchPlaceholder || "Search jobs..."}
            value={filters.search}
            onChange={(e) => {
              setFilters({ ...filters, search: e.target.value })
              debouncedFilterChange({ search: e.target.value })
            }}
            className="pl-10 pr-4 py-2 border-gray-200"
          />
        </div> */}
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{dict.jobs.filters.category}</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{dict.jobs.filters.city}</label>
            <Select value={filters.city || "all"} onValueChange={(value) => handleFilterChange({ city: value === "all" ? "" : value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {uniqueCities.map((city) => {
                  const cityJobCount = initialData.jobs.filter(job => job.location === city).length
                  return (
                    <SelectItem key={city} value={city}>
                      {city} ({cityJobCount})
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Organization Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{dict.jobs.filters.organization}</label>
            <Select value={filters.organization || "all"} onValueChange={(value) => handleFilterChange({ organization: value === "all" ? "" : value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Organizations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {uniqueOrganizations.map((org) => {
                  const orgJobCount = initialData.jobs.filter(job => job.organization === org).length
                  return (
                    <SelectItem key={org} value={org}>
                      {org} ({orgJobCount})
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
              onClick={() => handleFilterChange({ search: "", category: "", location: "", city: "", organization: "", type: "" })}
              className="w-full"
            >
              Clear All Filters
            </Button>
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

      {/* Jobs table - hidden on small screens, shown on desktop if table view is selected */}
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
                    {dict.jobs?.details?.company || "Organization"}
                  </th>
                  <th scope="col" className={`px-6 py-3 ${locale === 'ar' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    {dict.jobs?.title || "Title"}
                  </th>
                  <th scope="col" className={`px-6 py-3 ${locale === 'ar' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    {dict.jobs?.details?.location || "Location"}
                  </th>
                  <th scope="col" className={`px-6 py-3 ${locale === 'ar' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                    {dict.jobs?.details?.deadline || "Deadline"}
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dict.common?.view || "View"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <JobRow key={job._id} job={job} locale={locale} dict={dict} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Card view - always on mobile, on desktop if cards view is selected */}
      <div className={`${desktopView === 'cards' ? 'sm:block' : 'sm:hidden'} space-y-4`}>
        {filteredJobs.map((job) => {
          // Determine if job is new (posted in last 3 days)
          const postedDate = new Date(job.publishedAt || job.createdAt)
          const now = new Date()
          const isNew = (now.getTime() - postedDate.getTime()) < 3 * 24 * 60 * 60 * 1000
          return (
            <div
              key={job._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-200 p-0 overflow-hidden group"
            >
              {/* Header/title area */}
              <div className="flex items-center justify-between px-5 pt-5 pb-2 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <a href={`/${locale}/jobs/${job._id}`} className="text-lg font-extrabold text-gray-900 hover:text-blue-700 transition-colors cursor-pointer">
                    {job.title}
                  </a>
                </div>
                {isNew && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200 animate-pulse">new</span>
                )}
              </div>
              {/* Main content */}
              <div className="px-5 pb-5 pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="font-medium">{job.organization}</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Posted: {postedDate.toLocaleDateString(locale === 'ar' ? 'ar-YE' : 'en-US', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
                  {job.category && (
                    <span className="flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold"><Tag className="w-3 h-3" />{job.category}</span>
                  )}
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
                    <span>Salary:</span>
                    <span>{job.salary}</span>
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <a href={`/${locale}/jobs/${job._id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:from-blue-600 hover:to-purple-600 transition-all">
                      {dict.jobs?.details?.apply || 'Apply'}
                    </Button>
                  </a>
                  <a href={`/${locale}/jobs/${job._id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-gray-300 text-blue-700 font-semibold hover:bg-blue-50">
                      {dict.jobs?.details?.view || 'View'}
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
        <div className="mt-6">
          <Pagination
            currentPage={initialData.page}
            totalPages={Math.ceil(initialData.total / initialData.limit)}
            onPageChange={handlePageChange}
            className="justify-center"
          />
        </div>
      )}
    </div>
  )
}
