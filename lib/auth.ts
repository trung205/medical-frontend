"use client"

// Mock authentication utilities
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem("admin_token")
  return !!token
}

export function getAdminUser() {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("admin_user")
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function logout() {
  localStorage.removeItem("admin_token")
  localStorage.removeItem("admin_user")
  window.location.href = "/admin/login"
}
