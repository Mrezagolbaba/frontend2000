import { GetAuthenticator, OTPType } from "types/settings";
import { enhancedApi } from ".";

export const notificationSettingsApi = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    updateNotificationSettings: builder.mutation<ResponseType, string>({
      query(data) {
        return {
          method: "PATCH",
          url: `/user-settings/${data}/toggle`,
        };
      },
      invalidatesTags: ["settings"],
    }),
    getNotificationSettings: builder.query<ResponseType, void>({
      query() {
        return {
          method: "GET",
          url: "/user-settings",
        };
      },
      providesTags: ["settings"],
    }),
    getAuthenticator: builder.query<GetAuthenticator, void>({
      query() {
        return {
          method: "GET",
          url: "/auth/setup-authenticator",
        };
      },
      providesTags: ["settings"],
    }),
    setAuthenticator: builder.mutation<ResponseType, any>({
      query(data) {
        return {
          method: "POST",
          url: "/auth/setup-authenticator",
          data,
        };
      },
      invalidatesTags: ["settings"],
    }),
    requestSwitchOtpMethod: builder.mutation<void, OTPType>({
      query(targetMethod) {
        return {
          method: "POST",
          url: "/auth/request-switch-otp-method",
          data: { targetMethod },
        };
      },
    }),
    verifySwitchOtpMethod: builder.mutation<void, string>({
      query(code) {
        return {
          method: "POST",
          url: "/auth/verify-switch-otp-method",
          data: { code },
        };
      },
    }),
    switchOtpMethod: builder.mutation<any, string>({
      query(code) {
        return {
          method: "POST",
          url: "/auth/switch-otp-method",
          data: { code },
        };
      },
      invalidatesTags: ["settings"],
    }),
    getUserSettings: builder.query<any, void>({
      query() {
        return {
          method: "GET",
          url: `/user-settings`,
        };
      },
      providesTags: ["notices-settings"],
    }),
    updateUserSetting: builder.mutation<void, string>({
      query(key) {
        return {
          method: "PATCH",
          url: `/user-settings/${key}/toggle`,
        };
      },
      invalidatesTags: ["notices-settings"],
    }),
  }),
});

export const {
  useUpdateNotificationSettingsMutation,
  useGetNotificationSettingsQuery,
  useGetAuthenticatorQuery,
  useSetAuthenticatorMutation,
  useRequestSwitchOtpMethodMutation,
  useVerifySwitchOtpMethodMutation,
  useSwitchOtpMethodMutation,
  useGetUserSettingsQuery,
  useUpdateUserSettingMutation,
} = notificationSettingsApi;
