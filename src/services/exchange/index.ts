import request from "services/adapter";
import { toast } from "react-hot-toast";

type RequestType = {
  userId: string;
};
export const getCurrencySwap = async ({ userId }: RequestType) => {
  try {
    const response = await request.get(`/currency-swaps?join=transactions`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    toast.error(errorMessage, { position: "bottom-left" });
    throw new Error(errorMessage);
  }
};
interface RequestExchange {
  sourceCurrencyCode: string;
  sourceAmount: string | number;
  destinationCurrencyCode: string;
  feeCurrencyCode: string;
  dry_run?: boolean;
}

interface ExchangeRateData {
  expiresAt: string;
  pair: string;
  rate: string;
}
interface ExchangeRateReq {
  sourceCode: string;
  destinationCode?: string;
}
export const exchangeRate = async ({
  sourceCode,
  destinationCode = "IRR",
}: ExchangeRateReq) => {
  const res = await request.get<ExchangeRateData>(
    `rates/${sourceCode}-${destinationCode}`
  );
  return res.data;
};

export const exchangeReq = async ({
  sourceCurrencyCode,
  sourceAmount,
  destinationCurrencyCode,
  feeCurrencyCode,
  dry_run,
}: RequestExchange) => {

  try {
    const response = await request.post(
      `/currency-swaps${dry_run ? "?dry_run=true" : ""}`,
      {
        sourceCurrencyCode,
        sourceAmount,
        destinationCurrencyCode,
        feeCurrencyCode,
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
