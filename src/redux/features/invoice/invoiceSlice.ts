// {
//     "userId": "6d9b4d46-6f9e-4e73-a292-b8afcd7a4789",
//     "sourceCurrencyCode": "TRY",
//     "sourceAmount": "1.00",
//     "destinationCurrencyCode": "IRR",
//     "destinationAmount": "0",
//     "exchangeRate": "17997.06170421155729676787463271183",
//     "id": "d24787f6-ae30-4471-a4be-02b466fd0bf7",
//     "meta": {},
//     "createdAt": "2023-11-05T05:43:29.853Z",
//     "updatedAt": "2023-11-05T05:43:29.853Z"
//   }

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IInvoice } from "types/invoice";

// Path: src/redux/features/invoice/invoiceSlice.ts
const initialState: IInvoice = {
    userId: '',
    sourceCurrencyCode: '',
    sourceAmount: '',
    destinationCurrencyCode: '',
    destinationAmount: '',
    exchangeRate: '',
    id: '',
    meta: {},
    createdAt: '',
    updatedAt: '',
    };

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoice: (state, action: PayloadAction<IInvoice>) => {
            return { ...state, ...action.payload };
        },
        clearInvoice: () => {
            return initialState;
        },
    },
});

export const { setInvoice, clearInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;