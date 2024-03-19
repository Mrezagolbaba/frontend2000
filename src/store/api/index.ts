import axios, { AxiosRequestConfig } from "axios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { getRefToken } from "helpers";
import { setSession } from "contexts/JWTContext";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  validateStatus: function (status: any) {
    return status >= 200 && status < 300;
  },
});

let _refPromise: Promise<{ token: string; expiredAt: string }> | null;
export function refreshTokenPromise(): Promise<{
  token: string;
  expiredAt: string;
}> {
  if (!_refPromise) {
    const refresh_token = getRefToken();
    if (!refresh_token) return Promise.reject("No RefreshToken");
    _refPromise = axiosInstance
      .post(`/auth/refresh-token`, { refreshToken: refresh_token })
      .then(({ data }) => {
        setSession({
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
          refresh_token_expired_at: data.refreshTokenExpiresAt,
        });
        return {
          token: data.accessToken,
          expiredAt: data.accessTokenExpiresAt,
        };
      })
      .finally(() => {
        _refPromise = null;
      });
  }
  return _refPromise;
}

const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosRequestConfig,
    unknown,
    SerializedError | FetchBaseQueryError
  > =>
  async (args: AxiosRequestConfig, api: any, extraOptions: any) => {
    try {
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
      //   "token",
      // )}`;
      const res = await axiosInstance(args);
      const data = res.data;

      return { data };
    } catch (error: any) {
      console.log(error);
      const response = error.response;
      const status = response.status;
      const isLoginReq = response.config.url.includes("sign-in");

      if (status === 500 || status > 500) {
        toast.error("مشکلی در ارتباط با سرور بوجود آمده است", {
          position: "bottom-left",
        });
      }
      // else if (!isLoginReq && status === 401) {
      //   delete axiosInstance.defaults.headers.common.Authorization;
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("isLoggedIn");
      //   window.location.replace("/login");
      //   return axiosBaseQuery()(args, api, extraOptions);
      // }
      else if (response?.data?.translatedMessage) {
        toast.error(response.data.translatedMessage, {
          position: "bottom-left",
        });
      }

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export const api = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "bank-accounts",
    "settings",
    "user",
    "notices-settings",
    "wallets",
    "ticket",
    "reply-ticket",
  ],
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 30,
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({});

export const { invalidateTags } = enhancedApi.util;
