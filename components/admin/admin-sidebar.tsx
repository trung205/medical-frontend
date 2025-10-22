"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  FileText,
  FolderTree,
  Settings,
  LogOut,
  ChevronDown,
  Box,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

const menuItems = [
  // {
  //   title: "Tổng quan",
  //   href: "/admin",
  //   icon: LayoutDashboard,
  // },
  {
    title: "Loại sản phẩm",
    href: "/admin/product-types",
    icon: Box,
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
    subItems: [
      {
        title: "Tất cả bài viết",
        href: "/admin/blog",
      },
      {
        title: "Tags",
        href: "/admin/blog/tags",
      },
    ],
  },
  {
    title: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Blog"]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">NDBio Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Quản trị hệ thống</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedItems.includes(item.title);

          return (
            <div key={item.href}>
              {hasSubItems ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.title)}
                    className={cn(
                      "flex items-center justify-between w-full gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm",
                              isSubActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
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
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
