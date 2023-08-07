import { toast } from "react-hot-toast";
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import request from "../adapter";

export const forgetPassword = async (userData: any) => {
  try {
    const response = await request.post('auth/reset-password', userData);
    // Handle any additional logic related to forget password API response if needed
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Request failed. Please try again.');
    throw new Error(error.response?.data?.message || 'Request failed. Please try again.');
  }
};

const useForgetPassword = (
  options?: UseMutationOptions<any, Error, any, any>
): UseMutationResult<any, Error, any, any> => {
  return useMutation(forgetPassword, options);
};

export default useForgetPassword;
