import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "types/user";

const initialState: IUser = {
  id: "",
  email: "",
  emailVerified: false,
  password: "",
  otpMethod: "PHONE",
  firstTierVerified: false,
  secondTierVerified: false,
  internationalServicesVerified: false,
  firstName: "",
  lastName: "",
  firstNameEn: "",
  lastNameEn: "",
  birthDate: "",
  countryCode: "",
  nationalId: "",
  phoneNumber: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
