import { createSlice } from "@reduxjs/toolkit";

const status = ["checking", "authenticated", "not-authenticated"];

const initialState = {
  status: status[2],
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
    checkingCredentials: (state) => {
      state.status = status[0];
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
