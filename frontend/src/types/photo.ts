export interface Photo {
  _id: string;
  image: string;
  title: string;
  likes: Likes[];
  comments: Comment[];
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Comment {
  comment: string;
  userName: string;
  userImage: string;
  userId: string;
}

// Like
export interface Likes {
  userId: string;
}

//Publish
export type PublishPhotoFormData = {
  title: string;
  image: File | undefined;
  [key: string]: any;
};

//Update
export type UpdatePhotoFormData = {
  title: string;
};
export type UpdatePhotoResponse = {
  photo: Photo;
  message: string;
};
export type UpdatePhotoParams = {
  title: string;
  _id: string | undefined;
};

//Comment
export type PhotoCommentFormData = {
  comment: string;
};
export type PhotoCommentParams = {
  comment: string;
  _id: string | undefined;
};

export type PhotoCommentResponse = {
  comment: Comment;
  message: string;
};

// Delete
export type DeletePhotoResponse = {
  id: string;
  message: string;
};

// Like
export type LikePhotoResponse = {
  photoId: string;
  userId: string;
  message: string;
};

// State
export type PhotoState = {
  photos: Photo[] | undefined;
  photo: Photo | null;
  error: string | null;
  success: boolean;
  loading: boolean;
  message: string | null;
};
