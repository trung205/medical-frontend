import { adminApi } from '@/lib/axios-admin';

export const getProductTypes = async (params: any) => {
  const res = await adminApi.get('/product-types', { params });
  return res.data;
};

export const getProductType = async (id: number) => {
  const res = await adminApi.get(`/product-types/${id}`);
  return res.data;
};

export const updateProductType = async (id: number, payload: Record<string, any>) => {
  const res = await adminApi.patch(`/product-types/${id}`, payload);
  return res.data;
};

export const createProductType = async (payload: Record<string, any>) => {
  console.log("payload createProductType:", payload);
  const res = await adminApi.post('/product-types', payload);
  return res.data;
};

export const deleteProductType = async (id: number) => {  
  const res = await adminApi.delete(`/product-types/${id}`);
  return res.data;
};


