import axios from 'axios';

export const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com/admin',
  withCredentials: true,
});

adminApi.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
