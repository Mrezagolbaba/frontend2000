import {
  BankAccountsRequest,
  BankAccountsResponse,
  FormBankAccountRequest,
} from "types/profile";
import { enhancedApi } from ".";

export const profileManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    bankAccounts: builder.query<BankAccountsResponse[], BankAccountsRequest>({
      query() {
        return {
          method: "GET",
          url: "/bank-accounts",
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
  useBankAccountsQuery,
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
  useEditBankAccountMutation,
} = profileManagement;
