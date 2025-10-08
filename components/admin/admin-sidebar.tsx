"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, FileText, FolderTree, Settings, LogOut } from 'lucide-react'

const menuItems = [
  {
    title: "Tổng quan",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Danh mục",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Sản phẩm",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">MedEquip Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Quản trị hệ thống</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  )
}
