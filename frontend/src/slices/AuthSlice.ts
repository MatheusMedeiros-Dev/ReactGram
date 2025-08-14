import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import type {
  AuthState,
  AuthUser,
  LoginFormData,
  RegisterFormData,
} from "../types/auth";

const authUser: AuthUser | null = JSON.parse(
  localStorage.getItem("user") || "null"
);

export const register = createAsyncThunk<
  AuthUser,
  RegisterFormData,
  { rejectValue: string }
>("auth/register", async (registerData, thunkAPI) => {
  const data = await authService.register(registerData);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const login = createAsyncThunk<
  AuthUser,
  LoginFormData,
  { rejectValue: string }
>("auth/login", async (loginData, thunkAPI) => {
  const data = await authService.login(loginData);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

const initialState: AuthState = {
  user: authUser,
  error: null,
  success: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.success = false;
      state.error = null;
      authService.logout();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
        state.user = null;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
