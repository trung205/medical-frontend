import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import {
  createProductType,
  deleteProductType,
  getProductType,
  getProductTypes,
  updateProductType,
} from "@/services/admin/productTypesService";

export const useProductTypes = (params?: any, options?: any) => {
  return useQuery({
    queryKey: ["product-types", params],
    queryFn: () => getProductTypes(params),
    select: (res: any) => res.data,
    ...options,
  });
};

export const useProductType = (id: number) => {
  return useQuery({
    queryKey: ["product-type", id],
    queryFn: () => getProductType(id),
    select: (res: any) => res.data,
  });
};

export const useUpdateProductType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateProductType(id, payload),

    onSuccess: (res: any) => {
      if (res.success) {
        console.log("updateProductType success:", res);
        toast({
          title: "Thành công",
          description: "Cập nhật loại sản phẩm thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["product-types"] });
      }
    },

    onError: (error: any) => {
      console.log("updateProductType error:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Cập nhật loại sản phẩm thất bại!",
      });
    },
  });
};

export const useCreateProductType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: { payload: any }) => {
      console.log("payload:", payload);
      return createProductType(payload);
    },

    onSuccess: (res: any) => {
      if (res.success) {
        console.log("createProductType success:", res);
        toast({
          title: "Thành công",
          description: "Tạo loại sản phẩm thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["product-types"] });
      }
    },

    onError: (error: any) => {
      console.log("createProductType error:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Tạo loại sản phẩm thất bại!",
      });
    },
  });
};

export const useDeleteProductType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProductType(id),

    onSuccess: (res) => {
      if (res.success) {
        console.log("deleteProductType success:", res);
        toast({
          title: "Thành công",
          description: "Xóa loại sản phẩm thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["product-types"] });
      }
    },

    onError: (error: any) => {
      console.log("deleteProductType error:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Xóa loại sản phẩm thất bại!",
      });
    },
  });
};
