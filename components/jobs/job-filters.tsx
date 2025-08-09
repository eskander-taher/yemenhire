"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface JobFiltersProps {
  locale: string
  dict: any
  filters: {
    search: string
    category: string
    location: string
    type: string
  }
  onFilterChange: (filters: any) => void
}

export function JobFilters({ locale, dict, filters, onFilterChange }: JobFiltersProps) {
  const categories = ["Technology", "Healthcare", "Education", "Finance", "Marketing", "Engineering", "Sales", "Other"]

  const locations = ["Sana'a", "Aden", "Taiz", "Hodeidah", "Ibb", "Dhamar", "Mukalla", "Remote"]

  const jobTypes = [
    { value: "full-time", label: dict.jobs.types["full-time"] },
    { value: "part-time", label: dict.jobs.types["part-time"] },
    { value: "contract", label: dict.jobs.types.contract },
    { value: "freelance", label: dict.jobs.types.freelance },
  ]

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
              placeholder={dict.jobs.searchPlaceholder}
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="pl-10 rtl:pr-10 rtl:pl-3"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{dict.jobs.filters.category}</label>
          <Select value={filters.category} onValueChange={(value) => onFilterChange({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{dict.jobs.filters.location}</label>
          <Select value={filters.location} onValueChange={(value) => onFilterChange({ location: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{dict.jobs.filters.type}</label>
          <Select value={filters.type} onValueChange={(value) => onFilterChange({ type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {jobTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => onFilterChange({ search: "", category: "", location: "", type: "" })}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  )
}
