import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = typeof window !== "undefined" ? Cookies.get("adminToken") : null;

const user = typeof window !== "undefined" ? Cookies.get("user") : null;

export const initialState = {
  accessToken: token,
  user: user ? JSON.parse(user) : null,
  isAuthenticated:
    typeof window !== "undefined" && Cookies.get("adminToken") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;

      state.isAuthenticated = true;
      state.accessToken = token;
      state.user = user;

      Cookies.set("adminToken", token);
      Cookies.set("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        Cookies.remove("adminToken");
        Cookies.remove("user");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
