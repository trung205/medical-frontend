"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogHero } from "@/components/blog-hero"
import { BlogGrid } from "@/components/blog-grid"
import { useBlogsInfinite } from "@/hooks/user/useBlogs"
import { useRouter } from "next/navigation"

export default function BlogPage() {
  const router = useRouter()

  const {
    data: blogs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  }: any = useBlogsInfinite({
    // categorySlug: id,
    limit: 6,
  })
  console.log("blogs", blogs)
  const handleShowBlogDetail = (blog: any) => {
    router.push(`/blog/${blog?.slug || ""}`)
  }


  const formattedBlogs =
    blogs?.pages.flatMap((page: any) => page.data).flatMap((item: any) => item.data) || []
  console.log("hasNextPage", hasNextPage)
  console.log("formattedBlogs", formattedBlogs)
  return (
    <main className="min-h-screen">
      <Header />
      <BlogHero />
      <BlogGrid blogs={formattedBlogs} handleShowBlogDetail={handleShowBlogDetail} />
      <Footer />
    </main>
  )
}
