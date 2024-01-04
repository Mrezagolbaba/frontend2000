import axios, { AxiosRequestConfig } from "axios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorType, errorNormalizer } from "components/ErrorHandler";
import toast from "react-hot-toast";

type methodType = "get" | "post" | "put" | "patch" | "delete";

const accessTokenExpires =
  typeof window !== "undefined"
    ? window.localStorage.getItem("accessTokenExpires")
    : null;

const refreshTokenExpires =
  typeof window !== "undefined"
    ? window.localStorage.getItem("refreshTokenExpires")
    : null;

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  validateStatus: function (status: any) {
    return status >= 200 && status < 300;
  },
});

const isTokenExpired = () => {
  const expirationDate = new Date(accessTokenExpires as string);
  const currentTime = new Date();
  return currentTime >= expirationDate;
};

const isRefreshTokenExpired = () => {
  const expirationDate = new Date(refreshTokenExpires as string);
  const currentTime = new Date();
  return currentTime >= expirationDate;
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      const response = await axios.post("/refresh-token", {
        refreshToken: refreshToken,
      });
      const newAccessToken = response.data.access_token;
      // Update the access token in local storage
      localStorage.setItem("token", newAccessToken);
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      // Handle refresh token error (e.g., log out the user)
    }
  }
};

const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosRequestConfig,
    unknown,
    SerializedError | FetchBaseQueryError
  > =>
  async (args: AxiosRequestConfig, api: any, extraOptions: any) => {
    try {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
        "token",
      )}`;
      const res = await axiosInstance(args);
      const data = res.data;
      const method = res.config.method as methodType;
      const status = res.status;

      if (method !== "get" && status >= 200 && status < 300)
        data.message && toast(data.message, { position: "bottom-left" });
      return { data };
    } catch (error: any) {
      const response = error.response;
      const status = response.status;
      const url = response.config.url;

      if (status === 500 || status > 500) {
        toast.error("مشکلی در ارتباط با سرور بوجود آمده است", {
          position: "bottom-left",
        });
      } else if ((status === 401 && url !== "/login") || isTokenExpired()) {
        await refreshAccessToken();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
          "token",
        )}`;
        return axiosBaseQuery()(args, api, extraOptions);
      } else if (isRefreshTokenExpired()) {
        delete axiosInstance.defaults.headers.common.Authorization;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.replace("/login");
      } else {
        toast.error(errorNormalizer(response as ErrorType), {
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
  tagTypes: ["bank-accounts", "settings", "user"],
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({});

export const { invalidateTags } = enhancedApi.util;
