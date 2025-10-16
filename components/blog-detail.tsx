"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import { RelatedBlogPosts } from "@/components/related-blog-posts";
import { getImageBlog } from "@/utils/images";
import { useRouter } from "next/navigation";

export function BlogDetail({ blog }: any) {
  const router = useRouter();
  const handleShowTagBlogs = (tag: any) => {
    router.push(`/blog/tags/${tag?.slug}`);
  };
  return (
    <>
      <article className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            {/* <Badge variant="secondary" className="mb-4">
              Hướng dẫn
            </Badge> */}
            <div className="flex items-center gap-2">
              {blog?.tags?.map((tag: any) => (
                <Badge
                  id={tag?.id}
                  variant="secondary"
                  className="mb-4 cursor-pointer"
                  onClick={() => handleShowTagBlogs(tag)}
                >
                  {tag?.name}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-6 text-balance md:leading-14">
              {blog?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog?.author}</span>
              </div>
              {/* <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{blog.createdAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime} phút đọc</span>
            </div> */}
            </div>

            {/* <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Chia sẻ:</span>
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div> */}
          </div>

          {/* Featured Image */}
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-12">
            <Image
              src={
                getImageBlog(blog?.thumbnailId) ||
                "/blog-ultrasound-guide-detail.jpg"
              }
              alt="Hướng dẫn chọn mua máy siêu âm"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
          ></div>

          {/* Author Bio */}
          {/* <div className="mt-12 p-6 bg-secondary rounded-lg">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xl">
                NA
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  BS. Nguyễn Văn A
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bác sĩ chuyên khoa Chẩn đoán hình ảnh với hơn 15 năm kinh
                  nghiệm trong lĩnh vực siêu âm y khoa. Hiện đang là chuyên gia
                  tư vấn tại MedEquip Pro và giảng viên tại Đại học Y Hà Nội.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </article>
      <RelatedBlogPosts currentPost={blog} />
    </>
  );
}
