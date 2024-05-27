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
      query({ join, sort }) {
        return {
          method: "GET",
          url: `/currency-swaps`,
          params: {
            join,
            sort,
          },
        };
      },
    }),
    createCurrencySwap: builder.mutation<any, { isDry: boolean; data: any }>({
      query({ isDry, data }) {
        return {
          method: "POST",
          url: "/currency-swaps",
          params: {
            dry_run: isDry,
          },
          data,
        };
      },
    }),
    getCurrencySwap: builder.query<any, string>({
      query(id) {
        return {
          method: "GET",
          url: `/currency-swaps/${id}`,
          params: {
            join: "transactions",
          },
        };
      },
    }),
  }),
});

export const {
  useLazyRatesQuery,
  useCurrencySwapQuery,
  useCreateCurrencySwapMutation,
  useGetCurrencySwapQuery,
} = exchangeManagement;
