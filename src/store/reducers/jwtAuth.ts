// third-party
import { createSlice } from "@reduxjs/toolkit";

// types
import { AuthProps } from "types/auth";
import { jwtDecode } from "jwt-decode";
import { KeyedObject } from "types/root";
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
      state.isLoggedIn = true;
      state.isInitialized = true;
    },
    // setToken(state, action) {
    //   const { token } = action.payload;
    //   const data = jwtDecode<KeyedObject>(token);
    //   state.token = token;
    //   state.realm_access = data["realm_access"];
    //   state.resource_access = data["resource_access"];
    // },
    // // LOGOUT
    // setLogout(state, action) {
    //   state.token = "";
    //   state.isLoggedIn = false;
    //   state.isInitialized = true;
    //   state.realm_access = undefined;
    //   state.resource_access = undefined;
    // },
  },
});

export default auth.reducer;

// export const { setLogin, setToken, setLogout } = auth.actions;
export const { setLogin } = auth.actions;

export const selectAuth = (state: RootState) => state.auth;
