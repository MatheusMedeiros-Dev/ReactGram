import { api, requestConfig } from "../utils/config";

type PhotoData = {
  title: string;
  image: string;
};
type UpdatePhotoData = {
  title: string;
};

const publishPhoto = async (data: PhotoData, token: string) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const response = await fetch(api + "/photos/", config);
    const res = response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};

const getUserPhotos = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const response = await fetch(api + "/photos/user/" + id, config);
    const res = await response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};

const deletePhoto = async (photoId: string, token: string) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const response = await fetch(api + "/photos/" + photoId, config);
    const res = await response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};

const updatePhoto = async (
  data: UpdatePhotoData,
  photoId: string,
  token: string
) => {
  const config = requestConfig("PUT", data, token);
  try {
    const response = await fetch(api + "/photos/" + photoId, config);
    const res = await response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
};
export default photoService;
