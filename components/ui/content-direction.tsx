import { cn } from "@/lib/utils"

interface ContentDirectionProps {
  locale: string
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ContentDirection({
  locale,
  children,
  className,
  as: Component = "div"
}: ContentDirectionProps) {
  const isRTL = locale === "ar"

  return (
    <Component
      className={cn(
        isRTL ? "arabic-content" : "english-content",
        className
      )}
    >
      {children}
    </Component>
  )
}

// Utility function to get text direction class
export function getTextDirection(locale: string) {
  return locale === "ar" ? "rtl-text" : "ltr-text"
}

// Utility function to get content direction class
export function getContentDirection(locale: string) {
  return locale === "ar" ? "arabic-content" : "english-content"
}
