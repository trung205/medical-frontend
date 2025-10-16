import { publicApi } from '@/lib/axios-public';

export const getBlogs = async (params: any) => {
  const res = await publicApi.get('/blogs', { params });
  return res.data;
};

export const getBlog = async (id: number) => {
  const res = await publicApi.get(`/blogs/${id}`);
  return res.data;
};

export const getBlogBySlug = async (slug: string) => {
  const res = await publicApi.get(`/blogs/slug/${slug}`);
  return res.data;
};

export const getBlogTagBySlug = async (slug: string) => {
  const res = await publicApi.get(`/blog-tags/slug/${slug}`);
  return res.data;
};



