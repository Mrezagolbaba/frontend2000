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
  }),
});

export const { useLazyGetCoinsQuery } = publicApi;
