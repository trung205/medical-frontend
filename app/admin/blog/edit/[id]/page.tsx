"use client"

import { BlogEditor } from "@/components/admin/blog-editor"
import { useRouter } from "next/navigation"

const mockBlog = {
  id: "1",
  title: "Hướng dẫn chọn mua máy siêu âm phù hợp cho phòng khám",
  slug: "huong-dan-chon-mua-may-sieu-am-phu-hop-cho-phong-kham",
  excerpt: "Máy siêu âm là thiết bị y tế quan trọng trong chẩn đoán. Bài viết này sẽ hướng dẫn bạn...",
  content:
    "<h2>Giới thiệu</h2><p>Máy siêu âm là một trong những thiết bị y tế quan trọng nhất trong chẩn đoán hình ảnh...</p>",
  author: "BS. Nguyễn Văn A",
  status: "published",
  featured: true,
  image: "/blog-ultrasound-guide.jpg",
  publishedAt: "2024-01-15",
}

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleSave = (data: any) => {
    console.log("[v0] Updating blog post:", data)
    alert("Bài viết đã được cập nhật thành công!")
    router.push("/admin/blog")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Chỉnh sửa bài viết</h1>
        <p className="text-muted-foreground mt-1">Cập nhật nội dung bài viết blog</p>
      </div>

      <BlogEditor blog={mockBlog} onSave={handleSave} />
    </div>
  )
}
