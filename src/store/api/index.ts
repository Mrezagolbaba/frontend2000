import axios, { AxiosRequestConfig } from "axios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorType, errorNormalizer } from "components/ErrorHandler";
import toast from "react-hot-toast";

type methodType = "get" | "post" | "put" | "patch" | "delete";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_DEV,
  validateStatus: function (status: any) {
    return status >= 200 && status < 300;
  },
});

const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosRequestConfig,
    unknown,
    SerializedError | FetchBaseQueryError
  > =>
  async (args: AxiosRequestConfig, api: any, extraOptions: any) => {
    try {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      const res = await axiosInstance(args);
      const data = res.data;
      const method = res.config.method as methodType;
      const status = res.status;

      if (method !== "get" && status >= 200 && status < 300)
        toast(data.message, { position: "bottom-left" });

      return { data };
    } catch (error: any) {
      const response = error.response;
      const status = response.status;
      const isLoginReq = response.config.url.includes("sign-in");

      if (status === 500 || status > 500) {
        toast.error("مشکلی در ارتباط با سرور بوجود آمده است", {
          position: "bottom-left",
        });
      } else if (!isLoginReq && status === 401) {
        delete axiosInstance.defaults.headers.common.Authorization;
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        window.location.replace("/login");
        return axiosBaseQuery()(args, api, extraOptions);
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
  tagTypes: ["bank-accounts","settings","user"],
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({});

export const { invalidateTags } = enhancedApi.util;
