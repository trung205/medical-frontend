import { adminApi } from '@/lib/axios-admin';

export const getBlogs = async (params: any) => {
  const res = await adminApi.get('/blogs', { params });
  return res.data;
};

export const getBlog = async (id: number) => {
  const res = await adminApi.get(`/blogs/${id}`);
  return res.data;
};

export const updateBlog = async (id: number, payload: Record<string, any>) => {
  const res = await adminApi.patch(`/blogs/${id}`, payload);
  return res.data;
};

export const createBlog = async (payload: Record<string, any>) => {
  console.log("payload createBlog:", payload);
  const res = await adminApi.post('/blogs', payload);
  return res.data;
};

export const deleteBlog = async (id: number) => {
  const res = await adminApi.delete(`/blogs/${id}`);
  return res.data;
};

export const createBlogImage = async (blogId: number, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await adminApi.post(`/blogs/${blogId}/thumbnail`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateBlogImage = async (id: number, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await adminApi.put(`/blogs/thumbnail/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

