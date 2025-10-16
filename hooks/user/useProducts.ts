import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getProduct,
  getProductBySlug,
  getProducts,
} from "@/services/public/productService";

export const useProducts = (params?: any, options?: any) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    select: (res: any) => res.data,
    ...options,
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    select: (res) => res.data,
  });
};


export const useProductsInfinite = (params?: any) => {
  return useInfiniteQuery({
    queryKey: ["products", params],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getProducts({
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage: any) => {
      console.log("lastPage", lastPage)
      const { page: currentPage, totalPages } = lastPage.data.pagination || {};
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

