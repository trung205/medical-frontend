"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BlogTable } from "@/components/admin/blog-table"
import Link from "next/link"

// Mock data
const mockBlogs = [
  {
    id: "1",
    title: "Hướng dẫn chọn mua máy siêu âm phù hợp cho phòng khám",
    slug: "huong-dan-chon-mua-may-sieu-am-phu-hop-cho-phong-kham",
    excerpt: "Máy siêu âm là thiết bị y tế quan trọng trong chẩn đoán. Bài viết này sẽ hướng dẫn bạn...",
    author: "BS. Nguyễn Văn A",
    status: "published",
    featured: true,
    image: "/blog-ultrasound-guide.jpg",
    publishedAt: "2024-01-15",
    views: 1250,
  },
  {
    id: "2",
    title: "Công nghệ AI trong chẩn đoán hình ảnh y tế",
    slug: "cong-nghe-ai-trong-chan-doan-hinh-anh-y-te",
    excerpt: "Trí tuệ nhân tạo đang cách mạng hóa ngành y tế, đặc biệt trong lĩnh vực chẩn đoán...",
    author: "TS. Trần Thị B",
    status: "published",
    featured: true,
    image: "/blog-ai-medical-imaging.jpg",
    publishedAt: "2024-01-10",
    views: 2100,
  },
  {
    id: "3",
    title: "Bảo trì thiết bị y tế: Những điều cần biết",
    slug: "bao-tri-thiet-bi-y-te-nhung-dieu-can-biet",
    excerpt: "Bảo trì định kỳ giúp thiết bị y tế hoạt động ổn định và kéo dài tuổi thọ...",
    author: "KS. Lê Văn C",
    status: "draft",
    featured: false,
    image: "/blog-equipment-maintenance.jpg",
    publishedAt: null,
    views: 0,
  },
]

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState(mockBlogs)

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Blog</h1>
          <p className="text-muted-foreground mt-1">Quản lý bài viết và nội dung blog</p>
        </div>
        <Link href="/admin/blog/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Viết bài mới
          </Button>
        </Link>
      </div>

      <BlogTable data={blogs} onDelete={handleDelete} />
    </div>
  )
}
