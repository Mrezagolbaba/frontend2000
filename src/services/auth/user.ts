import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "react-query";
import request from "../adapter";
import toast from "react-hot-toast";

export const getMe = async () => {
  try {
    const response = await request.get("users/me");
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage, { position: "bottom-left" });
    throw error;
  }
};

// Hook for getting user information
export const useGetMe = (
  options?: UseMutationOptions<any, Error, any, any>
): UseMutationResult<any, Error, any, any> => {
  return useMutation(getMe, options);
};
