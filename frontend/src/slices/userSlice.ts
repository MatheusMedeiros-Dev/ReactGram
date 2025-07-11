import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import type { RootState } from "../store";

// Usuário autenticado
type AuthUser = {
  _id: string;
  name?: string;
  email?: string;
  bio?: string;
  profileImage?: string;
};

// Estado do slice
type AuthState = {
  user: AuthUser | null;
  error: string | null;
  success: boolean;
  loading: boolean;
  message: string;
};

// Parâmetros updateProfile
type UpdateProfileData = {
  name?: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  password?: string;
};

export const profile = createAsyncThunk<
  AuthUser,
  void,
  { state: RootState; rejectValue: string }
>("user/profile", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }

  const data = await userService.profile(token);
  return data;
});

export const updateProfile = createAsyncThunk<
  AuthUser,
  UpdateProfileData,
  { state: RootState; rejectValue: string }
>("user/update", async (updateData: UpdateProfileData, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await userService.updateProfile(updateData, token);
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  return data;
});

export const getUserById = createAsyncThunk<
  AuthUser,
  string,
  { state: RootState; rejectValue: string }
>("user/getById", async (id, thunkAPI) => {
  if (!id) {
    return thunkAPI.rejectWithValue("ID do usuário não fornecido");
  }
  const data = await userService.getUserById(id);
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  return data;
});

const initialState: AuthState = {
  user: null,
  error: null,
  success: false,
  loading: false,
  message: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso.";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
