"use client"

import type React from "react"
import Link from "next/link"
import { Search, Briefcase, FileText, TrendingUp, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface HeroSectionProps {
  locale: string
  dict: any
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const isRTL = locale === "ar"

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/${locale}/jobs?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>

      {/* Geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-float"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 rounded-lg rotate-45 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-indigo-200/30 rounded-full animate-float"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-24 h-24 bg-pink-200/30 rounded-lg rotate-12 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-lg border border-white/20">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">1000+ New Opportunities This Month</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="gradient-text">{dict.home.hero.title.split(" ").slice(0, 3).join(" ")}</span>
            <br />
            <span className="text-gray-800">{dict.home.hero.title.split(" ").slice(3).join(" ")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            {dict.home.hero.subtitle}
          </p>

          {/* Enhanced Search Bar */}
          {/* <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12 animate-scale-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 p-2">
                <div className="flex items-center">
                  <Search className={`w-6 h-6 text-gray-400 ${isRTL ? "mr-4 ml-2" : "ml-4 mr-2"}`} />
                  <Input
                    type="text"
                    placeholder={dict.home.hero.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 text-lg bg-transparent focus:ring-0 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {dict.home.hero.searchButton}
                  </Button>
                </div>
              </div>
            </div>
          </form> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href={`/${locale}/jobs`}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-glow"
              >
                <Briefcase className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{dict.home.hero.jobsButton}</span>
              </Button>
            </Link>
            <Link href={`/${locale}/tenders`}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FileText className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{dict.home.hero.tendersButton}</span>
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap justify-center items-center gap-8 text-gray-500 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Trusted by 10,000+ Users</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">Verified Opportunities</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">95% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
