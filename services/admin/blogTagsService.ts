import { adminApi } from '@/lib/axios-admin';

export const getBlogTags = async (params: any) => {
  const res = await adminApi.get('/blog-tags', { params });
  return res.data;
};

export const getBlogTag = async (id: number) => {
  const res = await adminApi.get(`/blog-tags/${id}`);
  return res.data;
};

export const updateBlogTag = async (id: number, payload: Record<string, any>) => {
  const res = await adminApi.patch(`/blog-tags/${id}`, payload);
  return res.data;
};

export const createBlogTag = async (payload: Record<string, any>) => {
  console.log("payload createBlogTag:", payload);
  const res = await adminApi.post('/blog-tags', payload);
  return res.data;
};

export const deleteBlogTag = async (id: number) => {  
  const res = await adminApi.delete(`/blog-tags/${id}`);
  return res.data;
};


