import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../components/axiosInstance.js";
import { jwtDecode } from "jwt-decode";

const REFRESH_URL = "/user/refresh-token";

// Check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    return jwtDecode(token).exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Load auth data from localStorage
const storedToken = localStorage.getItem("token");
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  role: JSON.parse(localStorage.getItem("role")) || null,
  token: storedToken || null,
  isAuthenticated: storedToken ? !isTokenExpired(storedToken) : false,
  error: null,
};

// *Login Thunk*
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post("/user/login", credentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", JSON.stringify(data.role));
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      console.log(document.cookie)
      const response = await axiosInstance.post(REFRESH_URL, {}, { withCredentials: true });

      console.log("API Response:", response.data);

      if (!response.data || !response.data.accesstoken) {
        throw new Error("Invalid token response");
      }

      localStorage.setItem("token", response.data.accesstoken);
      return response.data.accesstoken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      
      // Only clear local storage if the error is due to an invalid token, not network errors
      if (error.response?.status === 401) {
        localStorage.clear();
      }

      return rejectWithValue("Session expired, please login again");
    }
  }
);

// *Auth Slice*
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      return { ...initialState, isAuthenticated: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.role = payload.role;
        state.token = payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
        console.log(payload);
        
        state.token = payload;
        state.isAuthenticated = true;
      })
      .addCase(refreshAccessToken.rejected, (state, { payload }) => {
        state.token = null;
        state.isAuthenticated = false;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;