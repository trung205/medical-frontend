import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useBlog, useBlogs } from "@/hooks/user/useBlogs"
import { useMemo } from "react"
import { getImageBlog } from "@/utils/images"
import { Tag } from "./ui/tag"

const relatedPosts = [
  {
    id: 2,
    title: "Công nghệ AI trong chẩn đoán hình ảnh y khoa",
    excerpt:
      "Khám phá cách trí tuệ nhân tạo đang cách mạng hóa lĩnh vực chẩn đoán hình ảnh và nâng cao độ chính xác trong y học.",
    category: "Công nghệ",
    author: "TS. Trần Thị B",
    date: "12/01/2024",
    image: "/blog-ai-medical-imaging.jpg",
    readTime: "7 phút đọc",
  },
  {
    id: 3,
    title: "Bảo trì thiết bị y tế: Quy trình chuẩn và lưu ý quan trọng",
    excerpt: "Hướng dẫn chi tiết về quy trình bảo trì thiết bị y tế để đảm bảo hoạt động ổn định và tuổi thọ lâu dài.",
    category: "Bảo trì",
    author: "KS. Lê Văn C",
    date: "10/01/2024",
    image: "/blog-equipment-maintenance.jpg",
    readTime: "6 phút đọc",
  },
  {
    id: 4,
    title: "Xu hướng thiết bị y tế thông minh năm 2024",
    excerpt: "Điểm qua những xu hướng công nghệ mới nhất trong lĩnh vực thiết bị y tế và IoT trong chăm sóc sức khỏe.",
    category: "Xu hướng",
    author: "BS. Phạm Thị D",
    date: "08/01/2024",
    image: "/blog-smart-medical-devices.jpg",
    readTime: "8 phút đọc",
  },
]

interface RelatedBlogPostsProps {
  currentPostId: number
}

export function RelatedBlogPosts({ currentPost }: any) {
  

  const {data: relatedPosts}: any = useBlogs({
    tags: currentPost?.tags?.map((tag: any) => tag.id).join(','),
  },{
    enabled: currentPost?.tags?.length > 0,
  })

  const filteredPosts = useMemo(() => {
   if (!relatedPosts?.data || !relatedPosts?.data.length) return [];

    return relatedPosts?.data?.filter((post: any) => post.id !== currentPost.id)
  }, [relatedPosts, currentPost])
console.log("filteredPosts", filteredPosts)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Bài viết liên quan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Khám phá thêm các bài viết hữu ích khác</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredPosts?.map((post: any) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow pt-0">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={getImageBlog(post?.thumbnailId) || "/placeholder.svg"}
                  alt={post?.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {post?.tags?.map((tag: any) => (
                      <Badge key={tag.id}>{tag?.tag?.name}</Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                  {post?.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post?.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post?.author}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full group" size="sm">
                  <Link href={`/blog/${post.id}`}>
                    Đọc thêm
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
