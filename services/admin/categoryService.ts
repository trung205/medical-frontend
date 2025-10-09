import { adminApi } from '@/lib/axios-admin';

export const getCategories = async (params: any) => {
  const res = await adminApi.get('/categories', { params });
  return res.data;
};

export const updateCategory = async (id: number, payload: Record<string, any>) => {
  const res = await adminApi.patch(`/categories/${id}`, payload);
  return res.data;
};

export const createCategory = async (payload: Record<string, any>) => {
  const res = await adminApi.post('/categories', payload);
  return res.data;
};