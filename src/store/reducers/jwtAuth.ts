// third-party
import { createSlice } from "@reduxjs/toolkit";

// types
import { AuthProps } from "types/auth";
import { RootState } from "store/store";

// ----------------------------------------------------------------------

const initialState: AuthProps = {
  isLoggedIn: false,
  token: "",
  expiredAt: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // LOGIN
    setLogin(state, action) {
      const { token, expiredAt } = action.payload;
      state.token = token;
      state.expiredAt = expiredAt;
    },
    // VERIFY_LOGIN
    setVerifyLogin(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isInitialized", "true");
    },
    // LOGOUT
    setLogout(state) {
      state.token = "";
      state.expiredAt = "";
      state.isLoggedIn = false;
      localStorage.setItem("isInitialized", "false");
    },
  },
});

export default auth.reducer;
export const { setLogin, setVerifyLogin, setLogout } = auth.actions;

export const selectAuth = (state: RootState) => state.auth;
