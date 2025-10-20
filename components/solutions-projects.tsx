"use client"
import { FeaturedBlogs } from "./featured-blogs"
import { useBlogs } from "@/hooks/user/useBlogs"
import { useRouter } from "next/navigation"


export function SolutionsProjects() {
  const router = useRouter();
  const { data: blogs }: any = useBlogs({
    limit: 3,
    tagSlug: "giai-phap"
  });
  return (
    <section className=" bg-background">
      <div className="container mx-auto px-4">
        <div className="">
        <FeaturedBlogs
          blogs={blogs?.data || []}
          title="Dự án công nghệ"
          handleShowBlogs={() => router.push("/blog/tags/giai-phap")}
          titleClassName="lg:text-5xl font-bold mb-6 text-center"
        />
      </div>
      </div>
    </section>
  )
}
