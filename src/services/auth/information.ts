import { toast } from "react-hot-toast";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import request from "../adapter";

export const information = async (formData: any) => {
  try {
    const response = await request.post(
      "verifications/verify-first-tier",
      formData
    );
    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "submit information failed. Please try again.",
      { position: "bottom-left" }
    );
    throw new Error(
      error.response?.data?.message ||
        "submit information failed. Please try again."
    );
  }
};

const useInformation = (
  options?: UseMutationOptions<any, Error, any, any>
): UseMutationResult<any, Error, any, any> => {
  return useMutation(information, options);
};

export default useInformation;