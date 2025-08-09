import { Shield, Zap, Bell, ArrowRight } from "lucide-react"

interface FeaturesSectionProps {
  locale: string
  dict: any
}

export function FeaturesSection({ locale, dict }: FeaturesSectionProps) {
  const features = [
    {
      icon: Shield,
      title: dict.home.features.items[0].title,
      description: dict.home.features.items[0].description,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: Zap,
      title: dict.home.features.items[1].title,
      description: dict.home.features.items[1].description,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      icon: Bell,
      title: dict.home.features.items[2].title,
      description: dict.home.features.items[2].description,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">{dict.home.features.title}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{dict.home.features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`group hover-lift animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 h-full border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  {/* Decorative gradient overlay */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl transform translate-x-8 -translate-y-8`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-gray-500 group-hover:text-gray-700 transition-colors">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
