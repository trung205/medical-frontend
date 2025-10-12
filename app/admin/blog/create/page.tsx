"use client";

import { BlogEditor } from "@/components/admin/blog-editor";
import { useCreateBlog } from "@/hooks/admin/useBlogs";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const { mutate: createBlog } = useCreateBlog();

  const handleSave = (data: any) => {
    console.log("[v0] Saving blog post:", data);
   const {image, ...payload} = data;
    alert("Bài viết đã được lưu thành công!");
    createBlog(
      { payload },
      {
        onSuccess: () => {
          router.push("/admin/blog");
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
