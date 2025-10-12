import { adminApi } from "@/lib/axios-admin";

export const getProducts = async (params: any) => {
  const res = await adminApi.get("/products", { params });
  return res.data;
};

export const getProduct = async (id: number) => {
  const res = await adminApi.get(`/products/${id}`);
  return res.data;
};

export const updateProduct = async (
  id: number,
  payload: Record<string, any>
) => {
  const res = await adminApi.patch(`/products/${id}`, payload);
  return res.data;
};

export const createProduct = async (payload: Record<string, any>) => {
  const res = await adminApi.post("/products", payload);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await adminApi.delete(`/products/${id}`);
  return res.data;
};

export const createProductImage = async (
  id: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await adminApi.post(`/products/${id}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
