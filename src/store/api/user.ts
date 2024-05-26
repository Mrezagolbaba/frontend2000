import {
  CheckVerificationsResponse,
  FirstTierRequest,
  IUser,
  SetEnglishNamesRequest,
} from "types/user";
import { enhancedApi } from ".";

export const userApi = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IUser, void>({
      query() {
        return {
          method: "GET",
          url: "/users/me",
        };
      },
      providesTags: ["settings","otp"],
    }),
    updatePassword: builder.mutation<
      any,
      { oldPassword: string; newPassword: string }
    >({
      query(data) {
        return {
          method: "POST",
          url: "/users/update-password",
          data,
        };
      },
      invalidatesTags: ["user"],
    }),

    checkVerifications: builder.query<CheckVerificationsResponse[], void>({
      query() {
        return {
          method: "GET",
          url: "/verifications",
        };
      },
    }),
    englishNames: builder.mutation<any, SetEnglishNamesRequest>({
      query(data) {
        return {
          method: "PATCH",
          url: "/users/me",
          data,
        };
      },
    }),
    firstTier: builder.mutation<void, FirstTierRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/verifications/verify-first-tier",
          data,
        };
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdatePasswordMutation,
  useCheckVerificationsQuery,
  useEnglishNamesMutation,
  useFirstTierMutation,
} = userApi;
