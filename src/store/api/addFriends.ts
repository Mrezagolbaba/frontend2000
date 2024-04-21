import { Ireferral,IreferredUser } from "types/referral";
import { enhancedApi } from ".";
import { RateResponse } from "types/exchange";
export const addFriendApi = enhancedApi.injectEndpoints({
    endpoints: (builder) => ({
      getReferralCode: builder.query<Ireferral, void>({
        query() {
          return {
            method: "GET",
            url: `/referral-codes/default`,
          };
        },
      }),
      getFriendsList: builder.query<IreferredUser, void>({
        query() {
          return {
            method: "GET",
            url: `/referral-codes/referredUsers`,
          };
        },
      }),
    }),
  });

export const { useGetReferralCodeQuery, useGetFriendsListQuery } = addFriendApi;