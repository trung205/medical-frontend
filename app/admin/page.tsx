"use client";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, FileText, FolderTree, TrendingUp } from 'lucide-react'
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const stats = [
    {
      title: "Tổng sản phẩm",
      value: "156",
      icon: Package,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Bài viết blog",
      value: "48",
      icon: FileText,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Danh mục",
      value: "24",
      icon: FolderTree,
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Lượt xem",
      value: "12.5K",
      icon: TrendingUp,
      trend: "+23%",
      trendUp: true,
    },
  ]

  useEffect(() => {
      router.push("/admin/product-types");
  }, [router]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tổng quan</h1>
        <p className="text-muted-foreground mt-1">
          Chào mừng bạn đến với trang quản trị NDBio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs mt-1 ${stat.trendUp ? "text-green-600" : "text-red-600"}`}>
                  {stat.trend} so với tháng trước
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Thêm sản phẩm mới", item: "Máy siêu âm GE Voluson E10", time: "2 giờ trước" },
                { action: "Cập nhật bài viết", item: "Hướng dẫn bảo trì thiết bị y tế", time: "5 giờ trước" },
                { action: "Thêm danh mục", item: "Thiết bị phẫu thuật nội soi", time: "1 ngày trước" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Máy siêu âm 4D", sales: 45, revenue: "2.5 tỷ" },
                { name: "Máy X-quang kỹ thuật số", sales: 32, revenue: "1.8 tỷ" },
                { name: "Máy thở ICU", sales: 28, revenue: "1.6 tỷ" },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} đơn hàng</p>
                  </div>
                  <p className="text-sm font-semibold text-accent">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
