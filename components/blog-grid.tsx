import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import { getImageBlog } from "@/utils/images";

export function BlogGrid({
  blogs,
  handleShowBlogDetail,
}: {
  blogs: any[];
  handleShowBlogDetail: (blog: any) => void;
}) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <Card
              key={post?.id}
              className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
              onClick={() => handleShowBlogDetail(post)}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={getImageBlog(post?.thumbnailId) || "/placeholder.svg"}
                  alt={post?.title || ""}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {post?.tags.map((tag: any) => (
                      <Badge variant="secondary" id={tag?.id}>
                        {tag?.tag?.name || "Xu hướng"}
                      </Badge>
                    ))}
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {post?.readTime || "6 phút đọc"}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                  {post?.title || ""}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post?.excerpt || ""}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post?.author || ""}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post?.date || ""}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group">
                  Đọc thêm
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
