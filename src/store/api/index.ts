import Notify from "components/Notify";
import axios, { AxiosRequestConfig } from "axios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { clearUser } from "store/reducers/features/user/userSlice";
import { getRefToken } from "helpers";
import { isEmpty } from "lodash";
import { setLogin, setLogout } from "store/reducers/jwtAuth";
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
        console.log("data", data);

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
      const res = await axiosInstance(args);
      const data = res.data;

      return { data };
    } catch (error: any) {
      const response = error.response;
      const status = response.status;
      const isPrivate = !isEmpty(response?.config?.headers?.Authorization);

      if (status === 500 || status > 500)
        Notify({
          type: "error",
          text: "مشکلی در ارتباط با سرور بوجود آمده است",
        });
      else if (status === 401 && isPrivate) {
        try {
          const { token, expiredAt } = await refreshTokenPromise();
          api.dispatch(
            setLogin({
              token,
              expiredAt,
            }),
          );
        } catch (err) {
          setSession(null);
          localStorage.setItem("isInitialized", "false");
          api.dispatch(setLogout());
          api.dispatch(clearUser());
          window.location.assign("/login");
        }
        return axiosBaseQuery()(args, api, extraOptions);
      } else if (response?.data?.translatedMessage)
        Notify({
          type: "error",
          text: response.data.translatedMessage,
        });

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
    "debit-accounts",
  ],
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 30,
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({});

export const { invalidateTags } = enhancedApi.util;
