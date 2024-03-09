import { enhancedApi } from ".";
import {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  OTPRequest,
  ResendOTPRequest,
  ForgotPasswordRequest,
} from "types/auth";

export const authApi = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/auth/login",
          data,
        };
      },
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/auth/signup",
          data,
        };
      },
    }),
    otp: builder.mutation<void, OTPRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/auth/verify-2fa",
          data,
        };
      },
    }),
    resendOtp: builder.mutation<void, ResendOTPRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/auth/resend-2fa",
          data,
        };
      },
    }),
    forgotPassword: builder.mutation<AuthResponse, ForgotPasswordRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/auth/reset-password",
          data,
        };
      },
    }),
    setPassword: builder.mutation<void, string>({
      query(password) {
        return {
          method: "POST",
          url: "/auth/set-password",
          data: {
            password,
          },
        };
      },
    }),
    getSession: builder.query<any, any>({
      query() {
        return {
          method: "GET",
          url: "/auth/sessions",
        };
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useSetPasswordMutation,
  useGetSessionQuery,
} = authApi;
