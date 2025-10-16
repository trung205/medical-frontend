"use client";

import { BlogEditor } from "@/components/admin/blog-editor";
import {
  useBlog,
  useCreateMultipleBlogImages,
  useUpdateBlog,
  useUpdateBlogImages,
} from "@/hooks/admin/useBlogs";
import { useRouter } from "next/navigation";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  console.log("params:", params);

  const { data: blog } = useBlog(Number(id));
  const { mutate: mutateUpdate } = useUpdateBlog();
  const { mutate: createBlogImages } = useCreateMultipleBlogImages();
  const { mutate: mutateUpdateThumbnail } = useUpdateBlogImages();

  const handleSave = (data: any) => {
    const { tags, thumbnail, imageUpdate, ...rest } = data;
    const formatTags = tags?.map((tag: any) => tag.id) || [];
    mutateUpdate(
      {
        id: Number(id),
        payload: {
          ...rest,
          tags: formatTags,
        },
      },
      {
        onSuccess: (res: any) => {
          if (res.success) {
            if (!imageUpdate) {
              router.push("/admin/blog");
              return;
            }

            if (thumbnail && thumbnail.id) {
              mutateUpdateThumbnail(
                {
                  images: [imageUpdate],
                },
                {
                  onSuccess: (res: any) => {
                    console.log("[v0] Updated blog thumbnail:", res);
                    router.push("/admin/blog");
                  },
                }
              );
            } else {
              createBlogImages(
                {
                  blogId: Number(id),
                  images: [imageUpdate],
                },
                {
                  onSuccess: (res: any) => {
                    router.push("/admin/blog");
                  },
                }
              );
            }
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
