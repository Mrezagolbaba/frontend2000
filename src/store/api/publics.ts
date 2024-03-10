import { enhancedApi } from ".";
import { RateResponse } from "types/exchange";

export const publicsApi = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    getRate: builder.query<
      RateResponse,
      { targetCurrencyCode: "IRR" | "USDT"; sourceCurrencyCode: string }
    >({
      query({ sourceCurrencyCode, targetCurrencyCode }) {
        return {
          method: "GET",
          url: `/rates/${sourceCurrencyCode}-${targetCurrencyCode}`,
        };
      },
    }),
  }),
});

export const { useGetRateQuery } = publicsApi;
