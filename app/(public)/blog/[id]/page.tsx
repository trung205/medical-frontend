"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogDetail } from "@/components/blog-detail"
import { useBlog } from "@/hooks/user/useBlogs";

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
const { data: blog } = useBlog(params.id);
  // const { data: blog } = useBlog(params.id);
  return (
    <main className="min-h-screen">
      <Header />
      <BlogDetail blog={blog} />
      <Footer />
    </main>
  )
}
