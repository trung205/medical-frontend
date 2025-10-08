"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsChecking(false)
      return
    }

    const checkAuth = () => {
      const authenticated = isAuthenticated()

      if (!authenticated) {
        router.replace("/admin/login")
        return
      }

      setIsChecking(false)
    }

    checkAuth()
  }, [pathname, router])

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (isChecking || !isAuthenticated()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return <>{children}</>
}
