import { enhancedApi } from ".";

export const userApi = enhancedApi.injectEndpoints({
    endpoints: (builder) => ({
        updatePassword: builder.mutation<any, { oldPassword: string, newPassword: string }>({
            query(data) {
              return {
                method: "POST",
                url: "/v1/users/update-password",
                data,
              };
            },
            invalidatesTags: ["user"],
          }),
    }),
});

export const {
    useUpdatePasswordMutation,
} = userApi;   