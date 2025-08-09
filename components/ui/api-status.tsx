"use client"

import { useEffect, useState } from "react"
import { Database, Wifi, WifiOff } from "lucide-react"
import { testApiConnection } from "@/lib/api"

export function ApiStatus() {
  const [showStatus, setShowStatus] = useState(false)
  const [isConnected, setIsConnected] = useState<boolean | null>(null)

  useEffect(() => {
    const lastCheck = typeof window !== 'undefined' ? localStorage.getItem('lastApiCheck') : null;
    if (lastCheck && Date.now() - Number(lastCheck) < 10 * 60 * 1000) return;
    if (typeof window !== 'undefined') localStorage.setItem('lastApiCheck', String(Date.now()));
    const checkConnection = async () => {
      try {
        const connected = await testApiConnection()
        setIsConnected(connected)
      } catch (error) {
        setIsConnected(false)
      }
    }

    // Check connection after a delay
    const timeout = setTimeout(() => {
      checkConnection()
      setShowStatus(true)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  if (!showStatus) {
    return null
  }

  return (
    <div
      className={`fixed bottom-4 right-4 px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-slide-up ${isConnected === null
          ? "bg-gray-100 text-gray-800"
          : isConnected
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
    >
      {isConnected === null ? (
        <Database className="w-4 h-4" />
      ) : isConnected ? (
        <Wifi className="w-4 h-4" />
      ) : (
        <WifiOff className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">
        {isConnected === null ? "Checking API..." : isConnected ? "API Connected" : "API Offline"}
      </span>
    </div>
  )
}
