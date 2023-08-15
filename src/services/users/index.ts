import {
  QueryFunction,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "react-query";
import request from "../adapter";
import toast from "react-hot-toast";

interface UserData {
  birthDate: string | null;
  countryCode: string;
  createdAt: string;
  deletedAt: string | null;
  email: string | null;
  emailVerified: boolean;
  firstName: string | null;
  firstTierVerified: boolean;
  id: string;
  lastName: string | null;
  nationalId: string | null;
  otpMethod: "PHONE" | "EMAIL";
  phoneNumber: string;
  secondTierVerified: boolean;
  updatedAt: string;
}

export const getMe: QueryFunction<UserData, any> = async ({ queryKey }) => {
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
  options?: UseQueryOptions<UserData, Error>
): UseQueryResult<UserData, Error> => {
  return useQuery<UserData, Error>("getMe", getMe, options);
};
