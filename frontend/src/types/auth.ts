export interface AuthUser {
  _id: string;
  profileImage?: string;
  token: string;
}

export type AuthState = {
  user: AuthUser | null;
  error: string | null;
  success: boolean;
  loading: boolean;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};
