"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle, Activity } from "lucide-react";
import { useLogin } from "@/hooks/admin/useLogin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { mutate, isPending } = useLogin();

  const [form, setForm] = useState({
    email: "admin@ndbio.com",
    password: "123456",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    mutate(form, {
      onSuccess: (res) => {
        if (res.success) {
          router.push("/admin");
        } else {
          setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }
      },
      onError: (error: any) => {
        console.error("Login error:", error);
        const msg =
          error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng thử lại.";
        setError(msg);
      },
    });
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  NDBio Admin
                </h1>
                <p className="text-sm text-muted-foreground">
                  Hệ thống quản trị
                </p>
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold">Đăng nhập</CardTitle>
              <CardDescription className="mt-2">
                Nhập thông tin đăng nhập để truy cập trang quản trị
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@medequip.vn"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={isPending}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  disabled={isPending}
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={isPending}
              >
                {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm font-medium mb-2 text-foreground">
                  Thông tin đăng nhập demo:
                </p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    admin@medequip.vn
                  </p>
                  <p>
                    <span className="font-medium">Mật khẩu:</span> admin123
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-navy-600 via-navy-700 to-teal-700 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative z-10 max-w-md text-center space-y-6">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-white">
              Quản lý thiết bị y tế
            </h2>
            <p className="text-lg text-white/80">
              Hệ thống quản trị toàn diện cho việc quản lý sản phẩm, danh mục và
              nội dung blog
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-white/70">Sản phẩm</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-sm text-white/70">Danh mục</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold text-white">100+</p>
              <p className="text-sm text-white/70">Bài viết</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
