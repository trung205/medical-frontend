"use client";

import { BlogEditor } from "@/components/admin/blog-editor";
import { useCreateBlog, useCreateMultipleBlogImages } from "@/hooks/admin/useBlogs";
import { createBlogImage } from "@/services/admin/blogService";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const { mutate: createBlog } = useCreateBlog();
  const { mutate: createBlogImage } = useCreateMultipleBlogImages();

  const handleSave = (data: any) => {
    console.log("[v0] Saving blog post:", data);
    const { tags, imageUpdate, thumbnail, ...payload }: any = data;
    const formatTags = tags?.map((tag: any) => tag.id) || [];
    // console.log("[v0] Saving blog post:", payload);
    createBlog(
      {
        payload: {
          ...payload,
          tags: formatTags,
        },
      },
      {
        onSuccess: (data) => {
          console.log("[v0] Created blog post:", data);
          if (imageUpdate) {
            createBlogImage({
              blogId: data.data.id,
              images: [imageUpdate],
            }, {
              onSuccess: (data) => {
                console.log("[v0] Created blog image:", data);
                router.push("/admin/blog");
              },
            })
          } 

        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Viết bài mới</h1>
        <p className="text-muted-foreground mt-1">
          Tạo bài viết blog mới cho website
        </p>
      </div>

      <BlogEditor onSave={handleSave} />
    </div>
  );
}
