import { adminApi } from '@/lib/axios-admin';

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const { data } = await adminApi.post('/auth/login', payload);
  return data;
};
