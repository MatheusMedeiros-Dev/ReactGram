import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/AuthService";

type AuthUser = {
  token: string;
  _id: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type AuthState = {
  user: AuthUser | null;
  error: string | boolean;
  success: boolean;
  loading: boolean;
};

const authUser: AuthUser | null = JSON.parse(
  localStorage.getItem("user") || "null"
);
const initialState: AuthState = {
  user: authUser,
  error: false,
  success: false,
  loading: false,
};

export const register = createAsyncThunk<
  AuthUser,
  RegisterData,
  { rejectValue: string }
>("auth/register", async (registerData: RegisterData, thunkAPI) => {
  const data = await authService.register(registerData);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
