import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/auth";

const initialToken = localStorage.getItem("token") || null;

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const data = await loginApi(credentials);
  const token = data.token;
  localStorage.setItem("token", token);
  return token;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken,
    status: "idle",
    isInitializing: true,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.status = "idle";
      localStorage.removeItem("token");
    },
    setInitializing(state, action) {
      state.isInitializing = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      }),
});

export const { logout, setInitializing } = authSlice.actions;
export default authSlice.reducer;
