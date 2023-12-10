import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "react-query";
import request from "../adapter";
import toast from "react-hot-toast";



export const sendOtp = async (data: any) => {
  try {
    const response = await request.post("auth/verify-2fa", data);
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message, { position: "bottom-left" });
  }
};

// Hook for send OTP mutation
export const useSendOtp = (
  options?: UseMutationOptions<any, Error, any, any>
): UseMutationResult<any, Error, any, any> => {
  return useMutation(sendOtp, options);
};


export const resendOtp = async (data: any) => {
  try {
    const response = await request.post("auth/resend-2fa", data);
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message, { position: "bottom-left" });
  }
};

// Hook for resend OTP mutation
export const useResendOtp = (
  options?: UseMutationOptions<any, Error, any, any>
): UseMutationResult<any, Error, any, any> => {
  return useMutation(resendOtp, options);
};
