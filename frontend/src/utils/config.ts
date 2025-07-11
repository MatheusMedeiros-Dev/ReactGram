export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

export const requestConfig = (
  method: string,
  data?: any,
  token: string | null = null,
  image: boolean | null = null
) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {} as Record<string, string>,
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {} as Record<string, string>,
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      } as Record<string, string>,
    };
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
