import { toast } from "react-hot-toast";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import request from "../adapter";

export const signup = async (userData: any) => {
  try {
    const response = await request.post("auth/signup", userData);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem('accessTokenExpires',response.data.accessTokenExpiresAt)
    localStorage.setItem('refreshToken',response.data.refreshToken)
    localStorage.setItem('refreshTokenExpires',response.data.refreshTokenExpiresAt)

    return response.data;
  } catch (error: any) {
    toast.error(
      error.response.data.message || "Register failed. Please try again.",
      { position: "bottom-left" }
    );
    throw new Error(
      error.response?.data?.message || "Register failed. Please try again."
    );
  }
};
const useCreateUser = (
  options?: UseMutationOptions<any, Error, any, any>
): UseMutationResult<any, Error, any, any> => {
  return useMutation(signup, options);
};

export default useCreateUser;
