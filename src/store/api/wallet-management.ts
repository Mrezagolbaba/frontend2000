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
  }),
});

export const { useDepositMutation, useDepositInfoQuery, useWithdrawMutation } =
  walletManagement;
