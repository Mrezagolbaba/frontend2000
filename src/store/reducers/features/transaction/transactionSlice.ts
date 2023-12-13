import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction } from "types/transaction";
import { getTransactions } from "services/transaction";

const initialState:{
    data: Transaction[],
    loading: boolean,
    error: any,
} = {
    data: [],
    loading: false,
    error: null,
};

export const getTransactionsList = createAsyncThunk('setting/setNotificationSetting', async (id: string) => {
    try {
        const response = await getTransactions({ id });
        return response;
    } catch (error: any) {
        console.log(error);
    }
});

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransactionsList.fulfilled, (state, action: any) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getTransactionsList.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTransactionsList.pending, (state, action: any) => {
                state.data = [];
                state.loading = true;
                state.error = null;
            })
    }
});

// export const { } = transactionSlice.actions;
export default transactionSlice.reducer;