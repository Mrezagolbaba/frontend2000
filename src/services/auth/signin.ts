import { toast } from "react-hot-toast";
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import request from "../adapter";

export const login = async (userData: any) => {
  try {
    const response = await request.post('auth/login', userData);
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};

const useLogin = (
  options?: UseMutationOptions<any, Error, any, any>
): UseMutationResult<any, Error, any, any> => {
  return useMutation(login, options);
};

export default useLogin;
