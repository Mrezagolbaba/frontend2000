import { RateResponse } from "types/exchange";
import { enhancedApi } from ".";

export const publicApi = enhancedApi.injectEndpoints({
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
    getRates: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: `/rates`,
          params,
        };
      },
    }),
    getRateList: builder.query<any, any>({
      query(list) {
        return {
          method: "GET",
          url: `/rates/list/${list}`,
        };
      },
    }),
  }),
});

export const {
  useLazyGetRateQuery,
  useGetRatesQuery,
  useLazyGetRateListQuery,
  useGetRateListQuery,
} = publicApi;
