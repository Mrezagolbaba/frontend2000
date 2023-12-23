import {
  CurrencyCode,
  DepositRequest,
  TransactionResponse,
  WithdrawRequest,
  DepositInfoResponse,
} from "types/wallet";
import { enhancedApi } from ".";

export const walletManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    deposit: builder.mutation<TransactionResponse, DepositRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/transactions/deposit",
          data,
        };
      },
    }),
    withdraw: builder.mutation<TransactionResponse, WithdrawRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/transactions/withdraw",
          data,
        };
      },
    }),
    depositInfo: builder.query<DepositInfoResponse[], CurrencyCode>({
      query(currencyCode) {
        return {
          method: "GET",
          url: `/transactions/deposit-bank-accounts/${currencyCode}`,
        };
      },
    }),
    transactionStatus: builder.query<TransactionResponse, string>({
      query(transactionId) {
        return {
          method: "GET",
          url: `/transactions/${transactionId}`,
        };
      },
    }),
    verifyOtpWithdraw: builder.mutation<any, any>({
      query (data) {
        return {
          method: "POST",
          url: `/transactions/withdraw/${data.transactionId}/verify-2fa`,
          data: { code: data.code },
        }
      },
    }),
    resendOtpWithdraw: builder.mutation<any, any>({
      query: (transactionId) => ({
        method: "POST",
        url: `/transactions/withdraw/${transactionId}/resend-2fa`,
      })
    }),
    cancelTransaction: builder.mutation<TransactionResponse, string>({
      query(transactionId) {
        return {
          method: "POST",
          url: `/transactions/${transactionId}/cancel`,
        };
      },
    }),
    transactionFee: builder.query<any, any>({
      query(code) {
        return {
          method: "GET",
          url: `/currencies/${code}`,
        };
      },
    }),
  }),
});


export const {
  useDepositMutation,
  useDepositInfoQuery,
  useWithdrawMutation,
  useTransactionStatusQuery,
  useVerifyOtpWithdrawMutation,
  useResendOtpWithdrawMutation,
  useCancelTransactionMutation,
  useTransactionFeeQuery,
} = walletManagement;
