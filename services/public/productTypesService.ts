import { publicApi } from '@/lib/axios-public';

export const getProductTypes = async (params: any) => {
  const res = await publicApi.get('/product-types', { params });
  return res.data;
};

export const getProductType = async (id: number) => {
  const res = await publicApi.get(`/product-types/${id}`);
  return res.data;
};



