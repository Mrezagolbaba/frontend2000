import { CurrencyCode } from "types/wallet";
import { enhancedApi } from ".";
import { RateResponse } from "types/exchange";

export const exchangeManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    rates: builder.query<
      RateResponse,
      { sourceCurrencyCode: CurrencyCode; targetCurrencyCode: CurrencyCode }
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

export const { useLazyRatesQuery } = exchangeManagement;
