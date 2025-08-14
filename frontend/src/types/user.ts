export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
  profileImage: string;
}
export type UpdateProfileFormData = {
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  password?: string;
};

export type UserState = {
  user: User | null;
  error: string | null;
  success: boolean;
  loading: boolean;
  message: string;
};
