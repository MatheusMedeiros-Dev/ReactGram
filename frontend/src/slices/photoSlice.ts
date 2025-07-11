import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import type { RootState } from "../store";

type Photo = {
  title: string;
  image: string;
  _id: string;
  [key: string]: any;
};
type InitialState = {
  photos: Photo[] | undefined;
  photo: Photo | null;
  error: string | null;
  success: boolean;
  loading: boolean;
  message: string;
};
type DeletedPhoto = {
  id: string;
  message: string;
};

type UpdatePhotoData = {
  _id: string;
  title: string;
};
type UpdatePhotoPayload = {
  _id: string;
  title: string;
  [key: string]: any;
};

const initialState: InitialState = {
  photos: [],
  photo: null,
  error: null,
  success: false,
  loading: false,
  message: "",
};

export const publishPhoto = createAsyncThunk<
  Photo,
  Photo,
  { state: RootState; rejectValue: string }
>("photo/publish", async (photo, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;

  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.publishPhoto(photo, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  console.log(data);
  return data;
});

export const getUserPhotos = createAsyncThunk<
  Photo[],
  string,
  { state: RootState; rejectValue: string }
>("photo/userphotos", async (userId, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.getUserPhotos(userId, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  return data;
});

export const deletePhoto = createAsyncThunk<
  DeletedPhoto,
  string,
  { state: RootState; rejectValue: string }
>("photo/delete", async (photoId, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.deletePhoto(photoId, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  return data;
});

export const updatePhoto = createAsyncThunk<
  UpdatePhotoPayload,
  UpdatePhotoData,
  { state: RootState; rejectValue: string }
>("photo/update", async (photoData, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.updatePhoto(
    { title: photoData.title },
    photoData?._id,
    token
  );

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        state.photos?.unshift(state.photo);
        state.message = "Foto publicada!";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
        state.photo = null;
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(getUserPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
        state.photo = null;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = state.photos?.filter((photo) => {
          return photo._id !== action.payload.id;
        });
        state.message = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
        state.photo = null;
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = action.payload.message;
        state.photos?.map((photo) => {
          if (photo.id === action.payload._id) {
            return (photo.title = action.payload.photo.title);
          }
          return photo;
        });
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
        state.photo = null;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
