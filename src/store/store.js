import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
  },
});
