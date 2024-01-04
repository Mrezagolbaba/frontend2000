import { CheckVerificationsResponse, SetEnglishNamesRequest } from "types/user";
import { enhancedApi } from ".";

export const userApi = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useUpdatePasswordMutation,
  useCheckVerificationsQuery,
  useEnglishNamesMutation,
} = userApi;
