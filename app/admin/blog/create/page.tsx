"use client"

import { BlogEditor } from "@/components/admin/blog-editor"
import { useRouter } from "next/navigation"

export default function CreateBlogPage() {
  const router = useRouter()

  const handleSave = (data: any) => {
    console.log("[v0] Saving blog post:", data)
    // Trong thực tế sẽ gọi API để lưu vào database
    alert("Bài viết đã được lưu thành công!")
    router.push("/admin/blog")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Viết bài mới</h1>
        <p className="text-muted-foreground mt-1">Tạo bài viết blog mới cho website</p>
      </div>

      <BlogEditor onSave={handleSave} />
    </div>
  )
}
