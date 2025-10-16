"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogHero } from "@/components/blog-hero";
import { BlogGrid } from "@/components/blog-grid";
import { useBlogsInfinite, useBlogTagBySlug } from "@/hooks/user/useBlogs";
import { useRouter } from "next/navigation";

export default function TagsBlogPage({ params }: any) {
  const router = useRouter();
  const { slug } = params;

  const {
    data: blogs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  }: any = useBlogsInfinite({
    tagSlug: slug,
    limit: 6,
  });

  const { data: tag } = useBlogTagBySlug(slug);

  console.log("tag: ", tag)
  console.log("blogs", blogs);
  const handleShowBlogDetail = (blog: any) => {
    router.push(`/blog/${blog?.slug || ""}`);
  };

  const formattedBlogs =
    blogs?.pages
      .flatMap((page: any) => page.data)
      .flatMap((item: any) => item.data) || [];
  console.log("hasNextPage", hasNextPage);
  console.log("formattedBlogs", formattedBlogs);
  return (
    <main className="min-h-screen">
      <Header />
      <BlogHero title={tag?.name}/>
      <BlogGrid
        blogs={formattedBlogs}
        handleShowBlogDetail={handleShowBlogDetail}
      />
      <Footer />
    </main>
  );
}
