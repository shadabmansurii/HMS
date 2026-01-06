import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"; // ✅ named import

const getInitialState = () => {
  const persisted = JSON.parse(localStorage.getItem("auth")) || {
    isLoggedIn: false,
  };
  const token = localStorage.getItem("token");

  // If token exists, check if it is expired
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        // Token expired, clear storage
        localStorage.clear();
        return { isLoggedIn: false };
      }
      // Token valid
      return { isLoggedIn: true };
    } catch (err) {
      // Invalid token
      localStorage.clear();
      return { isLoggedIn: false };
    }
  }

  return persisted;
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
