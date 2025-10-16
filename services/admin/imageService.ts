import { adminApi } from '@/lib/axios-admin';

export const uploadEditorImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await adminApi.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
};

