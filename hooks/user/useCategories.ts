import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createCategory,
  deleteCategory,
  getCategories,
  getCategoriesOptions,
  getCategory,
  updateCategory,
} from "@/services/admin/categoryService";
import { toast } from "@/hooks/use-toast";

export const useCategories = (params?: any, options?: any ) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
    select: (res: any) => res.data,
    ...options,
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    select: (res) => res.data,
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateCategory(id, payload),

    onSuccess: (res) => {
      if (res.success) {
        console.log("updateCategory success:", res);
        toast({
          title: "Thành công",
          description: "Cập nhật danh mục thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      }
    },

    onError: (error: any) => {
      console.log('updateCategory error:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Cập nhật thất bại!",
      });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: { payload: any }) =>
      createCategory(payload),

    onSuccess: (res) => {
      if (res.success) {
        toast({
          title: "Thành công",
          description: "Tạo danh mục thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      }
    },

    onError: (error: any) => {
      console.log('createCategory error:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Tạo danh mục thất bại!",
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),

    onSuccess: (res) => {
      if (res.success) {
        console.log("deleteCategory success:", res);
        toast({
          title: "Thành công",
          description: "Xóa danh mục thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      }
    },

    onError: (error: any) => {
      console.log('deleteCategory error:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Xóa danh mục thất bại!",
      });
    },
  });
};


export const useGetCategoriesOptions = (params?: any, options?: any) => {
  return useQuery({
    queryKey: ["categoriesOptions", params],
    queryFn: () => getCategoriesOptions(params),
    select: (res) => res.data,
    ...options,
  });
};