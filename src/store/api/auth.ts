import {
    CheckVerificationsResponse,
    IUser,
    SetEnglishNamesRequest,
} from "types/user";
import { enhancedApi } from ".";

export const authApi = enhancedApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IUser, { phoneNumber: string; password: string; type: string }>({
            query(data) {
                return {
                    method: "POST",
                    url: "/auth/login",
                    data,
                };
            },
        }),
        register: builder.mutation<IUser, { phoneNumber: string; password: string; type: string }>({
            query(data) {
                return {
                    method: "POST",
                    url: "/auth/register",
                    data,
                };
            },
        }),

    }),
});
export const {
    useLoginMutation,
    useRegisterMutation,
} = authApi;