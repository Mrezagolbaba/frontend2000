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
    currencySwap: builder.query<any, any>({
      query({ params }) {
        return {
          method: "GET",
          url: `/currency-swaps`,
          params: params,
        };
      },
    }),
    wallets: builder.query<any, void>({
      query() {
        return {
          method: "GET",
          url: "/wallets",
        };
      },
    }),
  }),
});

export const { useLazyRatesQuery, useCurrencySwapQuery, useWalletsQuery } =
  exchangeManagement;
