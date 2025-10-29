import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authIndex";

export const store = configureStore({
  reducer: {
    // slices:
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
