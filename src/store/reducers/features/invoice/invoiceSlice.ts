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