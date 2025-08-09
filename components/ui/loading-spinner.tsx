export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-200`}>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 border-r-purple-600"></div>
        </div>
        <div
          className={`absolute inset-0 ${sizeClasses[size]} animate-pulse rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20`}
        ></div>
      </div>
    </div>
  )
}
