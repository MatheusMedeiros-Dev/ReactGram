import type { UpdateProfileFormData } from "../types/user";
import { api, requestConfig } from "../utils/config";

const profile = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const response = await fetch(api + "/users/profile", config);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return { errors: [error instanceof Error ? error.message : String(error)] };
  }
};

const updateProfile = async (data: UpdateProfileFormData, token: string) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const response = await fetch(api + "/users/", config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return { errors: [error instanceof Error ? error.message : String(error)] };
  }
};

const getUserById = async (id: string) => {
  const config = requestConfig("GET");

  try {
    const response = await fetch(api + "/users/" + id, config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
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
  getUserById,
};
export default userService;
