import type { LoginFormData, RegisterFormData } from "../types/auth";
import { api, requestConfig } from "../utils/config";

const register = async (data: RegisterFormData) => {
  const config: RequestInit = requestConfig("POST", data);

  try {
    const response = await fetch(api + "/users/register", config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {
    return { errors: [error instanceof Error ? error.message : String(error)] };
  }
};

const login = async (data: LoginFormData) => {
  const config = requestConfig("POST", data);

  try {
    const response = await fetch(api + "/users/login", config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }

    const res = await response.json();

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {
    return { errors: [error instanceof Error ? error.message : String(error)] };
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};
export default authService;
