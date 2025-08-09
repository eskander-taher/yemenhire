"use client"

import { useEffect, useState, useRef } from "react"
import { Briefcase, FileText, Building, Users } from "lucide-react"

interface StatsSectionProps {
  locale: string
  dict: any
  stats: {
    jobs: number
    tenders: number
    companies: number
    applications: number
  }
}

export function StatsSection({ locale, dict, stats: initialStats }: StatsSectionProps) {
  const [stats, setStats] = useState({
    jobs: 0,
    tenders: 0,
    companies: 0,
    applications: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStats({
        jobs: Math.floor(initialStats.jobs * progress),
        tenders: Math.floor(initialStats.tenders * progress),
        companies: Math.floor(initialStats.companies * progress),
        applications: Math.floor(initialStats.applications * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setStats(initialStats)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, initialStats])

  const statsData = [
    {
      label: dict.home.stats.jobs,
      value: stats.jobs,
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: dict.home.stats.tenders,
      value: stats.tenders,
      icon: FileText,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: dict.home.stats.companies,
      value: stats.companies,
      icon: Building,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: dict.home.stats.applications,
      value: stats.applications,
      icon: Users,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`text-center group hover-lift ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
                <div
                  className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value.toLocaleString()}
                  {stat.value > 0 ? "+" : ""}
                </div>
                <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
