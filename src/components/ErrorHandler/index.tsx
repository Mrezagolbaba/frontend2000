import { useEffect, useState } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AlertDanger } from "components/AlertWidget";

type Props = {
  error?: SerializedError | FetchBaseQueryError;
  onclose?: () => void;
};

export type ErrorType =
  | SerializedError
  | { status: number; data: unknown }
  | { status: "FETCH_ERROR"; data?: undefined; error: string }
  | {
      status: "PARSING_ERROR";
      originalStatus: number;
      data: string;
      error: string;
    }
  | { status: "CUSTOM_ERROR"; data?: unknown; error: string }
  | undefined;

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export const errorNormalizer = (error: ErrorType) => {
  if (isFetchBaseQueryError(error)) {
    switch (error?.status) {
      case "FETCH_ERROR":
      case undefined: {
        return "FETCH_ERROR";
      }
      case "PARSING_ERROR": {
        return "PARSING_ERROR";
      }
      case "CUSTOM_ERROR": {
        return "CUSTOM_ERROR";
      }
      case 500: {
        return "عدم برقراری ارتباط با سرور";
      }
      case 501:
      case 502:
      case 503:
      case 504: {
        return "ارتباط با سرویس دهنده قطع می باشد";
      }
      default: {
        return (error?.data as any)?.message;
      }
    }
  } else {
    if (isErrorWithMessage(error)) return error.message;
  }
  return "";
};

export const errorMessages = (errorMessage: any) => {
  if (typeof errorMessage === "string") {
    return <p>{errorMessage}</p>;
  }
  if (typeof errorMessage === "object") {
    for (const prop in errorMessage) {
      if (Object.prototype.hasOwnProperty.call(errorMessage, prop)) {
        return <p>{errorMessage[prop]}</p>;
      }
    }
  }

  return <p>FETCH_ERROR</p>;
};

const ErrorHandler = (props: Props) => {
  const { error, onclose } = props;
  const [errorMessage, setErrorMessage] = useState<string | string[]>("");

  useEffect(() => {
    const err = errorNormalizer(error as ErrorType);
    setErrorMessage(err);
  }, [error]);

  return (
    <div style={{ paddingTop: "10px", width: "100%" }} className="showAlert">
      <AlertDanger text={errorMessages(errorMessage)} hasIcon={true} />
    </div>
  );
};

export default ErrorHandler;
