import { publicApi } from '@/lib/axios-public';

export const getCategories = async (params: any) => {
  const res = await publicApi.get('/categories', { params });
  return res.data;
};

export const getCategory = async (id: number) => {
  const res = await publicApi.get(`/categories/${id}`);
  return res.data;
};

export const getCategoryBySlug = async (slug: string) => {
  const res = await publicApi.get(`/categories/slug/${slug}`);
  return res.data;
};


