import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import type { RootState } from "../store";
import type {
  DeletePhotoResponse,
  LikePhotoResponse,
  Photo,
  PhotoCommentParams,
  PhotoCommentResponse,
  PhotoState,
  PublishPhotoFormData,
  UpdatePhotoParams,
  UpdatePhotoResponse,
} from "../types/photo";

export const publishPhoto = createAsyncThunk<
  Photo,
  PublishPhotoFormData,
  { state: RootState; rejectValue: string }
>("photo/publish", async (photoData, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;

  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.publishPhoto(photoData, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
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
  DeletePhotoResponse,
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
  UpdatePhotoResponse,
  UpdatePhotoParams,
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

export const getPhotoById = createAsyncThunk<
  Photo,
  string,
  { state: RootState; rejectValue: string }
>("photo/getPhoto", async (photoId, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.getPhotoById(photoId, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  return data;
});

export const like = createAsyncThunk<
  LikePhotoResponse,
  string,
  { state: RootState; rejectValue: string }
>("photo/like", async (photoId, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.like(photoId, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const photoComment = createAsyncThunk<
  PhotoCommentResponse,
  PhotoCommentParams,
  { state: RootState; rejectValue: string }
>("photo/comment", async (photoData, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.photoComment(
    { comment: photoData.comment },
    photoData._id!,
    token
  );
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});
export const getAllPhotos = createAsyncThunk<
  Photo[],
  void,
  { state: RootState; rejectValue: string }
>("photo/getAllPhotos", async (_NEVER, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.getAllPhotos(token);
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  return data;
});

export const searchPhotos = createAsyncThunk<
  Photo[],
  string,
  { state: RootState; rejectValue: string }
>("photo/search", async (query, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token não encontrado");
  }
  const data = await photoService.searchPhotos(query, token);
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  return data;
});

const initialState: PhotoState = {
  photos: [],
  photo: null,
  error: null,
  success: false,
  loading: false,
  message: null,
};
export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
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
        if (state.photo && state.photo._id === action.payload.photo._id) {
          state.photo.title = action.payload.photo.title;
        }
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
      })
      .addCase(getPhotoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPhotoById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
      })
      .addCase(getPhotoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
        state.photo = null;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = action.payload.message;
        if (state.photo?.likes) {
          state.photo.likes.push({ userId: action.payload.userId });
        }
        state.photos = state.photos?.map((photo) =>
          photo._id === action.payload.photoId
            ? {
                ...photo,
                likes: [...photo.likes, { userId: action.payload.userId }],
              }
            : photo
        );
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
      })
      .addCase(photoComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo?.comments.push(action.payload.comment);
        state.message = action.payload.message;
      })
      .addCase(photoComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
      })
      .addCase(getAllPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(getAllPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
      })
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(searchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
