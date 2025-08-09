"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  locale: string
  dict: any
}

export function LanguageSwitcher({ locale, dict }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en"
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLanguage}
      className="flex items-center space-x-2 rtl:space-x-reverse bg-transparent"
    >
      <Globe className="w-4 h-4" />
      <span>{dict.nav.language}</span>
    </Button>
  )
}
