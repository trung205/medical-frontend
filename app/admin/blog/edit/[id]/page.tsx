"use client";

import { BlogEditor } from "@/components/admin/blog-editor";
import { useBlog, useUpdateBlog } from "@/hooks/admin/useBlogs";
import { useRouter } from "next/navigation";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  console.log("params:", params);

  const { data: blog } = useBlog(Number(id));
  const { mutate: mutateUpdate } = useUpdateBlog();

  const handleSave = (data: any) => {
    console.log("[v0] Updating blog post:", data);
    mutateUpdate(
      {
        id: Number(id),
        payload: data,
      },
      {
        onSuccess: (res: any) => {
          if (res.success) {
            router.push("/admin/blog");
          }
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Chỉnh sửa bài viết
        </h1>
        <p className="text-muted-foreground mt-1">
          Cập nhật nội dung bài viết blog
        </p>
      </div>

      <BlogEditor blog={blog} onSave={handleSave} />
    </div>
  );
}
