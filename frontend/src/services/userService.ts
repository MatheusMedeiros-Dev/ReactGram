import { api, requestConfig } from "../utils/config";

type UpdateProfileData = {
  name?: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  password?: string;
};

const profile = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const response = await fetch(api + "/users/profile", config);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return { errors: [error instanceof Error ? error.message : String(error)] };
  }
};

const updateProfile = async (data: UpdateProfileData, token: string) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const response = await fetch(api + "/users/", config);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return { errors: [error instanceof Error ? error.message : String(error)] };
  }
};

const userService = {
  profile,
  updateProfile,
};
export default userService;
