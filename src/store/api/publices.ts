import { RateResponse } from "types/exchange";
import { enhancedApi } from ".";

export const publicApi = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoins: builder.query<
      RateResponse,
      { source: string; destination: string }
    >({
      query({ source, destination }) {
        return {
          method: "GET",
          url: `rates/${source}-${destination}`,
        };
      },
    }),
    getRates: builder.query<any, any>({
      query() {
        return {
          method: "GET",
          url: `/rates`,
        };
      },
    }),
  }),
});

export const { useLazyGetCoinsQuery, useGetRatesQuery } = publicApi;
