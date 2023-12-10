import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRateList } from "services/rate";

interface RatesState {
    data: any[];
    loading: boolean;
    error: null | string;
}


const initialState:RatesState = {
    data: [],
    loading: false,
    error: null,
}

export const getRates = createAsyncThunk('rates/getRates', async () => {
    try {
        const res = await getRateList();      
        return res;
    } catch (error) {
        console.log(error);
    }
})


const ratesSlice = createSlice({
    name: 'rates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRates.pending, (state) => {
            state.loading = true;
        })
        .addCase(getRates.fulfilled, (state, action:any) => {
            state.data = action.payload ;
            state.loading = false;
        })
        .addCase(getRates.rejected, (state, action:any) => {
            state.loading = false;
            state.error = action.payload;
        })
    }

});

// export const { } = ratesSlice.actions;
export default ratesSlice.reducer;
