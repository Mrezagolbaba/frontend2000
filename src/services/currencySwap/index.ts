import request from "services/adapter";
import { toast } from "react-hot-toast";

type RequestType = {
  userId: string;
};
export const getCurrencySwap = async ({ userId }: RequestType) => {
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
interface RequestExchange {
  sourceCurrencyCode: string,
  sourceAmount: string,
  destinationCurrencyCode: string,
  feeCurrencyCode: string

}
export const exchangeCurrencySwap = async ({
  sourceCurrencyCode,
  sourceAmount,
  destinationCurrencyCode,
  feeCurrencyCode
}: RequestExchange) => {
  try {
    const response = await request.post(`/currency-swaps`, {
      sourceCurrencyCode,
      sourceAmount,
      destinationCurrencyCode,
      feeCurrencyCode
    })
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    toast.error(errorMessage, { position: "bottom-left" });
    throw new Error(errorMessage);
  }
}
interface ExchangeRateData {
  expiresAt: string;
  pair: string;
  rate: string;
}
export const exchangeRateBYIRR = async (sourceCurrencyCode:string) => {
  const res = await request.get<ExchangeRateData>(
    `rates/${sourceCurrencyCode}-IRR`
  );
  return res.data;
}

export const exchanteCommission = async ({
  sourceCurrencyCode,
  sourceAmount,
  destinationCurrencyCode,
  feeCurrencyCode
}: RequestExchange) => {
  try {
    const response = await request.post(`/currency-swaps?dry_run=true`, {
      sourceCurrencyCode,
      sourceAmount,
      destinationCurrencyCode,
      feeCurrencyCode
    })
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    toast.error(errorMessage, { position: "bottom-left" });
    throw new Error(errorMessage);
  }
}