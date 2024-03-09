// third-party
import { createSlice } from "@reduxjs/toolkit";

// types
import { AuthProps } from "types/auth";
import { RootState } from "store/store";

// ----------------------------------------------------------------------

const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
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
    // OTP
    setOtp(state) {
      (state.isLoggedIn = true), (state.isInitialized = true);
    },
    // setToken(state, action) {
    //   const { token } = action.payload;
    //   const data = jwtDecode<KeyedObject>(token);
    //   state.token = token;
    //   state.realm_access = data["realm_access"];
    //   state.resource_access = data["resource_access"];
    // },
    // LOGOUT
    setLogout(state) {
      state.token = "";
      state.expiredAt = "";
      state.isLoggedIn = false;
      state.isInitialized = true;
    },
  },
});

export default auth.reducer;

// export const { setLogin, setToken, setLogout } = auth.actions;
export const { setLogin, setOtp, setLogout } = auth.actions;

export const selectAuth = (state: RootState) => state.auth;
