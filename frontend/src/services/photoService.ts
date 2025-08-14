import type {
  PhotoCommentFormData,
  PublishPhotoFormData,
  UpdatePhotoFormData,
} from "../types/photo";
import { api, requestConfig } from "../utils/config";

const publishPhoto = async (data: PublishPhotoFormData, token: string) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const response = await fetch(api + "/photos/", config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
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
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
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
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};

const updatePhoto = async (
  data: UpdatePhotoFormData,
  photoId: string | undefined,
  token: string
) => {
  const config = requestConfig("PUT", data, token);
  try {
    const response = await fetch(api + "/photos/" + photoId, config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};

const getPhotoById = async (photoId: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const response = await fetch(api + "/photos/" + photoId, config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};

const like = async (photoId: string, token: string) => {
  const config = requestConfig("PUT", null, token);

  try {
    const response = await fetch(api + "/photos/like/" + photoId, config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};

const photoComment = async (
  data: PhotoCommentFormData,
  photoId: string,
  token: string
) => {
  const config = requestConfig("PUT", data, token);
  try {
    const response = await fetch(api + "/photos/comment/" + photoId, config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};
const getAllPhotos = async (token: string) => {
  const config = requestConfig("GET", null, token);
  try {
    const response = await fetch(api + "/photos", config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
};

const searchPhotos = async (query: string, token: string) => {
  const config = requestConfig("GET", null, token);
  try {
    const response = await fetch(api + "/photos/search?q=" + query, config);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Erro ao processar requisição"],
      };
    }
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
  getPhotoById,
  like,
  photoComment,
  getAllPhotos,
  searchPhotos,
};
export default photoService;
