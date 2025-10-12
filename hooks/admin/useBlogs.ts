import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "@/services/admin/blogService";

export const useBlogs = (params?: any, options?: any ) => {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => getBlogs(params),
    select: (res: any) => res.data,
    ...options,
  });
};

export const useBlog = (id: number) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
    select: (res: any) => res.data,
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateBlog(id, payload),

    onSuccess: (res: any) => {
      if (res.success) {
        console.log("updateBlog success:", res);
        toast({
          title: "Thành công",
          description: "Cập nhật bài viết thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
      }
    },

    onError: (error: any) => {
      console.log('updateBlog error:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Cập nhật bài viết thất bại!",
      });
    },
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: { payload: any }) => {
      console.log("payload:", payload);
      return createBlog(payload);
    },

    onSuccess: (res) => {
      if (res.success) {
        console.log("createBlog success:", res);
        toast({
          title: "Thành công",
          description: "Tạo bài viết thành công!",  
        });
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
      }
    },

    onError: (error: any) => {
      console.log('createBlog error:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Tạo bài viết thất bại!",
      });
    },
  });
};

export const useDeleteBlog = () => {    
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBlog(id),

    onSuccess: (res) => {
      if (res.success) {
        console.log("deleteBlog success:", res);
        toast({
          title: "Thành công",
          description: "Xóa bài viết thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["blogs"] });     
      }
    },

    onError: (error: any) => {
      console.log('deleteBlog error:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Xóa bài viết thất bại!",  
      });
    },
  });
};