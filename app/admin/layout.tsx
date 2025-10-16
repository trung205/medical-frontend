"use client";
import type React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AuthProvider } from "@/components/admin/auth-provider";
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    
    return (
      <Providers type="admin">
        <AuthProvider>{children}</AuthProvider>
      </Providers>
    );
  }

  return (
    <Providers type="admin">
      <AuthProvider>
        <div className="flex min-h-screen bg-muted/30">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <AdminHeader />
            <main className="flex-1 p-6">{children}</main>
             <Toaster />
          </div>
        </div>
      </AuthProvider>
    </Providers>
  );
}
