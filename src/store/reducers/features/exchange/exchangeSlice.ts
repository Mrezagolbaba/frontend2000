import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrencySwap } from "services/exchange";
import { Exchange } from "types/exchange";

const initialState: {
  data: Exchange[];
  loading: boolean;
  error: any;
} = {
  data: [],
  loading: false,
  error: null,
};

export const getExchangeList = createAsyncThunk(
  "exchange/exchangeList",
  async (userId: string) => {
    try {
      const response = await getCurrencySwap({ userId });
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExchangeList.fulfilled, (state, action: any) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getExchangeList.rejected, (state, action: any) => {
        state.data = [];
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getExchangeList.pending, (state, action: any) => {
        state.data = [];
        state.loading = true;
        state.error = null;
      });
  },
});

// export const { } = exchangeSlice.actions;
export default exchangeSlice.reducer;
