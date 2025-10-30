import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../interface/interface";

const initialAuthState: AuthState = {
  isLoggedIn: false,
  isSuccess: false,
  message: "",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    SET_REGISTERED_USER(state, action: any) {
      console.log("authSliceRegister:", action.payload);
      state.message = action.payload.msg;
    },
    SET_LOGGEDIN_USER(state, action: any) {
      console.log("authSliceLoggedin:", action.payload);
      state.isLoggedIn = true;
      state.message = action.payload.msg;
      state.user = action.payload.user;
    },
    SET_LOGGEDOUT_USER(state, action:any) {
      console.log("authSliceLoggedout:",action.payload)
      state.isLoggedIn = false;
      state.user = null;
    },
    RESET_AUTH(state) {
      // state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
});

export const {
  SET_REGISTERED_USER,
  SET_LOGGEDIN_USER,
  SET_LOGGEDOUT_USER,
  RESET_AUTH,
} = authSlice.actions;
