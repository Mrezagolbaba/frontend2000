import { toast } from "react-hot-toast";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import request from "../adapter";

type RequestType = {
  docType: string;
  file: File;
  fileName: string;
};

export const uploadDoc = async ({ docType, file, fileName }: RequestType) => {
  try {
    const formData = new FormData();
    formData.append(fileName, file);
    const response = await request.post(
      `verifications/documents/upload/${docType}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    toast.error(errorMessage, { position: "bottom-left" });
    throw new Error(errorMessage);
  }
};

const useUploadDoc = (
  options?: UseMutationOptions<any, Error, any, any>
): UseMutationResult<any, Error, any, any> => {
  return useMutation(uploadDoc, options);
};

const initialVerification = async (useInternationalServices: boolean) => {
  try {
    const response = await request.post(`verifications/initiate-second-tier`, {
      useInternationalServices,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    toast.error(errorMessage, { position: "bottom-left" });
    throw new Error(errorMessage);
  }
};

const useInitialVerification = (
  options?: UseMutationOptions<any, Error, any, any>
): UseMutationResult<any, Error, any, any> => {
  return useMutation(initialVerification, options);
};

export { useUploadDoc, useInitialVerification };
