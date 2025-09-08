"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TenderFiltersProps {
  locale: string
  dict: any
  filters: {
    search: string
    category: string
    location: string
    city: string
    organization: string
  }
  onFilterChange: (filters: any) => void
  availableOptions?: {
    categories?: string[]
    cities?: string[]
    organizations?: string[]
  }
}

export function TenderFilters({ locale, dict, filters, onFilterChange, availableOptions }: TenderFiltersProps) {
  const categories = availableOptions?.categories || [
    "Construction",
    "IT Services",
    "Consulting",
    "Healthcare",
    "Education",
    "Transportation",
    "Security",
    "Other",
  ]
  const cities = availableOptions?.cities || ["Sana'a", "Aden", "Taiz", "Hodeidah", "Ibb", "Dhamar", "Mukalla", "Nationwide"]
  const organizations = availableOptions?.organizations || []
  const locations = ["Sana'a", "Aden", "Taiz", "Hodeidah", "Ibb", "Dhamar", "Mukalla", "Nationwide"]

  const localizeCategory = (category: string) => {
    if (locale !== "ar") return category
    const map: Record<string, string> = {
      Construction: dict?.advertise?.form?.categories?.construction || "البناء والتشييد",
      "IT Services": "الخدمات التقنية",
      Consulting: dict?.advertise?.form?.categories?.consulting || "الاستشارات",
      Healthcare: dict?.advertise?.form?.categories?.healthcare || "الرعاية الصحية",
      Education: dict?.advertise?.form?.categories?.education || "التعليم",
      Transportation: dict?.advertise?.form?.categories?.transportation || "النقل والمواصلات",
      Security: "الأمن",
      Other: dict?.advertise?.form?.categories?.other || "أخرى",
    }
    return map[category] || category
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={dict.tenders.searchPlaceholder}
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="pl-10 rtl:pr-10 rtl:pl-3"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{dict.tenders.filters.category}</label>
          <Select value={filters.category} onValueChange={(value) => onFilterChange({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                  {localizeCategory(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{dict.tenders.filters.location}</label>
          <Select value={filters.location} onValueChange={(value) => onFilterChange({ location: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location.toLowerCase().replace(/\s+/g, "-")}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{dict.tenders.filters.city}</label>
          <Select value={filters.city} onValueChange={(value) => onFilterChange({ city: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Organization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{dict.tenders.filters.organization}</label>
          <Select value={filters.organization} onValueChange={(value) => onFilterChange({ organization: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Organizations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizations</SelectItem>
              {organizations.map((org) => (
                <SelectItem key={org} value={org}>
                  {org}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => onFilterChange({ search: "", category: "", location: "", city: "", organization: "" })}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  )
}
