import { toast } from "react-hot-toast";
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import request from "../adapter";

export const signup = async (userData: any) => {
    try {
      const response = await request.post('auth/signup', userData)
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error:any) {
     toast.error(error.response.data.message);
    }
  };
  const useCreateUser = (
    options?: UseMutationOptions<any, Error, any, any>
  ): UseMutationResult<any, Error, any, any> => {
    return useMutation(signup, options);
  };

  export default useCreateUser;