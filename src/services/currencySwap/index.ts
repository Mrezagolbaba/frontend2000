import request from "services/adapter";
import { toast } from "react-hot-toast";

type RequestType = {
    userId: string;
  };
export const getCurrencySwap = async ({userId}:RequestType) => {
    console.log(userId)
    try {
        const response = await request.get(`/currency-swaps`);
        return response.data;
    } catch (error: any) {
        const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage, { position: "bottom-left" });
      throw new Error(errorMessage);
    }
}