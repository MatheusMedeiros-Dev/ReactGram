import { api, requestConfig } from "../utils/config";

type Data = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const register = async (data: Data) => {
  const config: RequestInit = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);
    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {
    return { errors: [error] };
  }
};

const authService = {
  register,
};
export default authService;
