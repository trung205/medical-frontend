import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { getBlogBySlug, getBlogs, getBlogTagBySlug } from "@/services/public/blogService";

export const useBlogs = (params?: any, options?: any ) => {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => getBlogs(params),
    select: (res: any) => res.data,
    ...options,
  });
};

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    select: (res: any) => res.data,
  });
};

export const useBlogsInfinite = (params?: any) => {
  return useInfiniteQuery({
    queryKey: ["blogs", params],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getBlogs({
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

export const useBlogTagBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogTagBySlug(slug),
    select: (res: any) => res.data,
  });
};