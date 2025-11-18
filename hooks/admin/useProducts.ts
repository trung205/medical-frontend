import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import {
  createProduct,
  createProductImage,
  deleteProduct,
  deleteProductImage,
  getProduct,
  getProducts,
  updateProduct,
} from "@/services/admin/productService";

export const useProducts = (params?: any) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    select: (res) => res.data,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    select: (res) => res.data,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateProduct(id, payload),

    onSuccess: (res) => {
      if (res.success) {
        console.log("updateProduct success:", res);
        toast({
          title: "Thành công",
          description: "Cập nhật sản phẩm thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },

    onError: (error: any) => {
      console.log("updateProduct error:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Cập nhật thất bại!",
      });
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: { payload: any }) => createProduct(payload),

    onSuccess: (res) => {
      if (res.success) {
        toast({
          title: "Thành công",
          description: "Tạo sản phẩm thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Tạo sản phẩm thất bại!",
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),

    onSuccess: (res) => {
      if (res.success) {
        console.log("deleteProduct success:", res);
        toast({
          title: "Thành công",
          description: "Xóa sản phẩm thành công!",
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },

    onError: (error: any) => {
      console.log("deleteProduct error:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Xóa sản phẩm thất bại!",
      });
    },
  });
};

export const useCreateMultipleProductImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, images }: { productId: number; images: any[] }) => {
      const promises = images.map((file) =>
        createProductImage(productId, file)
      );

      return Promise.all(promises);
    },

    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Tạo ít nhất một hình ảnh sản phẩm thất bại!",
      });
    },
  });
};

export const useRemoveMultipleProductImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ images }: { images: any[] }) => {
      const promises = images.map((image) =>
        deleteProductImage(image.id)
      );

      return Promise.all(promises);
    },

    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    

    onError: (error: any) => {
      console.log("removeMultipleProductImages error:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Xóa ít nhất một hình ảnh sản phẩm thất bại!",
      });
    },
  });
};

