import { publicApi } from "@/lib/axios-public";

export const getProducts = async (params: any) => {
  const res = await publicApi.get("/products", { params });
  return res.data;
};

export const getProduct = async (id: number) => {
  const res = await publicApi.get(`/products/${id}`);
  return res.data;
};

export const getProductBySlug = async (slug: string) => {
  const res = await publicApi.get(`/products/slug/${slug}`);
  return res.data;
};
