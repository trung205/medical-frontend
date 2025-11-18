"use client"

// Mock authentication utilities
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem("adminToken")
  return !!token
}

export function getAdminUser() {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("adminToken")
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function logout() {
  localStorage.removeItem("adminToken")
  window.location.href = "/admin/login"
}
