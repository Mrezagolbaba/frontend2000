import {
  BankAccountsRequest,
  BankAccountsResponse,
  BanksResponse,
  BanksRequest,
  FormBankAccountRequest,
} from "types/profile";
import { enhancedApi } from ".";

export const profileManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
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
    bankAccounts: builder.query<BankAccountsResponse[], BankAccountsRequest>({
      query(filters) {
        return {
          method: "GET",
          url: "/bank-accounts",
          params: {
            filter: filters,
          },
        };
      },
      providesTags: ["bank-accounts"],
    }),
    createBankAccount: builder.mutation<any, FormBankAccountRequest>({
      query(data) {
        return {
          method: "POST",
          url: "/bank-accounts",
          data,
        };
      },
      invalidatesTags: ["bank-accounts"],
    }),
    editBankAccount: builder.mutation<any, FormBankAccountRequest>({
      query(data) {
        return {
          method: "PUT",
          url: "/bank-accounts",
          data,
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
  useEditBankAccountMutation,
} = profileManagement;
