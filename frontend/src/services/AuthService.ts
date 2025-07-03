import { api, requestConfig } from "../utils/config";

type Data = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginData = {
  email: string;
  password: string;
};

const register = async (data: Data) => {
  const config: RequestInit = requestConfig("POST", data);

  try {
    const response = await fetch(api + "/users/register", config);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
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

const login = async (data: LoginData) => {
  const config = requestConfig("POST", data);

  try {
    const response = await fetch(api + "/users/login", config);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
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
