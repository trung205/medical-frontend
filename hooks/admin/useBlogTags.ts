import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { createBlogTag, deleteBlogTag, getBlogTag, getBlogTags, updateBlogTag } from "@/services/admin/blogTagsService";

export const useBlogTags = (params?: any, options?: any ) => {
  return useQuery({
    queryKey: ["blog-tags", params],
    queryFn: () => getBlogTags(params),
    select: (res: any) => res.data,
    ...options,
  });
};

export const useBlogTag = (id: number) => {
  return useQuery({
    queryKey: ["blog-tag", id],
    queryFn: () => getBlogTag(id),
    select: (res: any) => res.data,
  });
};

export const useUpdateBlogTag = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateBlogTag(id, payload),

    onSuccess: (res: any) => {
      if (res.success) {
        console.log("updateBlogTag success:", res);
        toast({
          title: "Thành công",
          description: "Cập nhật tag thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["blog-tags"] });
      }
    },

    onError: (error: any) => {
      console.log('updateBlogTag error:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Cập nhật tag thất bại!",
      });
    },
  });
};

export const useCreateBlogTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: { payload: any }) => {
      console.log("payload:", payload);
      return createBlogTag(payload);
    },

    onSuccess: (res) => {
      if (res.success) {
        console.log("createBlogTag success:", res);
        toast({
          title: "Thành công",
          description: "Tạo tag thành công!",     
        });
        queryClient.invalidateQueries({ queryKey: ["blog-tags"] });
      }
    },

    onError: (error: any) => {
      console.log('createBlogTag error:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Tạo tag thất bại!",
      });
    },
  });
};

export const useDeleteBlogTag = () => {    
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBlogTag(id),

    onSuccess: (res) => {
      if (res.success) {
        console.log("deleteBlogTag success:", res);
        toast({
          title: "Thành công",
          description: "Xóa tag thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["blog-tags"] });         
      }
    },

    onError: (error: any) => {
      console.log('deleteBlogTag error:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Xóa tag thất bại!",  
      });
    },
  });
};