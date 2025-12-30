import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState,User } from "./authTypes";

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    logout: () => initialState,
  },
});
export const { loginSuccess, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;