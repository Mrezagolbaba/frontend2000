import { enhancedApi } from ".";

export const notificationSettingsApi = enhancedApi.injectEndpoints({
    endpoints: (builder) => ({
        updateNotificationSettings: builder.mutation<ResponseType, string>({
            query(data) {
                return {
                    method: "PATCH",
                    url: `user-settings/${data}/toggle`,
                };
            },
            invalidatesTags: ["settings"],
        }),
        getNotificationSettings: builder.query<ResponseType, void>({
            query() {
                return {
                    method: "GET",
                    url: "user-settings",
                };
            },
            providesTags: ["settings"],
        }),
        getAuthenticator: builder.query<ResponseType, void>({
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
        requestSwitchOtpMethod: builder.mutation<ResponseType, { targetMethod: string }>({
            query(data) {
                return {
                    method: "POST",
                    url: "/auth/request-switch-otp-method",
                    data,
                };
            },
            invalidatesTags: ["settings"],
        }),
        verifySwitchOtpMethod: builder.mutation<any, { code: string }>({
            query(data) {
                return {
                    method: "POST",
                    url: "/auth/verify-switch-otp-method",
                    data,
                };
            },
            invalidatesTags: ["settings"],
        }),
        requestDisableAuthenticator: builder.mutation<any, { targetMethod: string }>({
            query(data) {
                return {
                    method: "POST",
                    url: "/auth/request-disable-authenticator",
                    data,
                };
            },
            invalidatesTags: ["settings"],
        }),
        veryfyOtpAuthenticator: builder.mutation<any, { phoneOtpCode: string, emailOtpCode: string }>({
            query(data) {
                return {
                    method: "POST",
                    url: "/v1/auth/disable-authenticator",
                    data,
                };
            },
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
    useRequestDisableAuthenticatorMutation,
    useVeryfyOtpAuthenticatorMutation
} = notificationSettingsApi;