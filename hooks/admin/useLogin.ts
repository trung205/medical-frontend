import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/admin/authService';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response?.success) {
        const { access_token, user } = response.data;
        localStorage.setItem('adminToken', access_token);
        dispatch(setUser(user));
      }
    },
    onError: (error: any) => {
      console.error('Đăng nhập thất bại:', error.response?.data || error.message);
    },
  });
};
