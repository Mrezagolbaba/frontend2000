import {
  BankAccountsResponse,
  BanksResponse,
  BanksRequest,
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
    banks: builder.query<BanksResponse[], BanksRequest>({
      query({ filters }) {
        return {
          method: "GET",
          url: "/banks",
          params: {
            filter: filters,
          },
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
} = profileManagement;
