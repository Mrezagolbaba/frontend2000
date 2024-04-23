import {
  BankAccountsResponse,
  BanksResponse,
  FormBankAccountRequest,
  VerificationResponse,
} from "types/profile";
import { enhancedApi } from ".";

export const profileManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    getVerifications: builder.query<VerificationResponse[], void>({
      query() {
        return {
          method: "GET",
          url: `verifications`,
        };
      },
    }),
    uploadDoc: builder.mutation<any, any>({
      query({ docType, fileName, file }) {
        const formData = new FormData();
        formData.append(fileName, file);
        return {
          method: "POST",
          url: `verifications/documents/upload/${docType}`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    initialVerification: builder.mutation<any, void>({
      query() {
        return {
          method: "POST",
          url: "verifications/initiate-second-tier",
        };
      },
    }),
    initialInternational: builder.mutation<any, void>({
      query() {
        return {
          method: "POST",
          url: "verifications/initiate-international-services",
        };
      },
    }),
    banks: builder.query<BanksResponse[], any>({
      query(params) {
        return {
          method: "GET",
          url: "/banks",
          params: params,
        };
      },
    }),
    bankAccounts: builder.query<BankAccountsResponse[], any>({
      query({ params }) {
        return {
          method: "GET",
          url: "/bank-accounts",
          params: { ...params },
        };
      },
      providesTags: ["bank-accounts"],
    }),
    createBankAccount: builder.mutation<any, FormBankAccountRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/bank-accounts",
          data: {
            ...data,
            cardNumber: data.cardNumber,
          },
        };
      },
      invalidatesTags: ["bank-accounts"],
    }),

    deleteBankAccount: builder.mutation<any, any>({
      query(id) {
        return {
          method: "DELETE",
          url: `/bank-accounts/${id}`,
        };
      },
      invalidatesTags: ["bank-accounts"],
    }),
    getDebitAccount: builder.query<any, any>({
      query() {
        return {
          method: "GET",
          url: "/bank-accounts/debit-account",
        };
      },
    }),
    debitSubscription: builder.mutation<{ url: string }, string>({
      query(bankId) {
        return {
          method: "PATCH",
          url: `/bank-accounts/request-debit-subscription/${bankId}`,
        };
      },
    }),
    disconnectDebit: builder.mutation<any, { string }>({
      query(id) {
        return {
          method: "PATCH",
          url: `/bank-accounts/remove-debit-subscription/${id}`,
        };
      },
    }),
  }),
});

export const {
  useUploadDocMutation,
  useInitialVerificationMutation,
  useInitialInternationalMutation,
  useBanksQuery,
  useBankAccountsQuery,
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
  useGetVerificationsQuery,
  useGetDebitAccountQuery,
  useDebitSubscriptionMutation,
  useDisconnectDebitMutation,
} = profileManagement;
