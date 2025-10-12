"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BlogTable } from "@/components/admin/blog-table"
import Link from "next/link"
import { useBlogs } from "@/hooks/admin/useBlogs"
import { CommonPagination } from "@/components/ui/common-pagination"


export default function BlogManagementPage() {

   const [page, setPage] = useState(1);
  const [conditions, setConditions] = useState({
    search: "",
  });

  const {data: blogsData, isLoading}: any = useBlogs({
    page,
    ...conditions,
  });
  const { data: blogs = [], pagination = {} } = blogsData || {};
  const { totalPages, total } = pagination || {};

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
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
      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
