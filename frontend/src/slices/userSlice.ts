import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import type { RootState } from "../store";
import type { UpdateProfileFormData, User, UserState } from "../types/user";

export const profile = createAsyncThunk<
  User,
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
  User,
  UpdateProfileFormData,
  { state: RootState; rejectValue: string }
>("user/update", async (updateData, thunkAPI) => {
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
  User,
  string,
  { rejectValue: string }
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

const initialState: UserState = {
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
      state.error = null;
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
        state.user = action.payload;
        state.error = null;
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
