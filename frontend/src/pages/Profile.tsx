import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import {
  useRef,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { getUserById } from "../slices/userSlice";
import { uploads } from "../utils/config";
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  resetMessage,
  updatePhoto,
} from "../slices/photoSlice";
import AppButton from "../components/AppButton";
import Message from "../components/Message";
import { IoEyeSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";

type LocalPhoto = {
  _id: string;
  title: string;
  image: string;
  [key: string]: any;
};
type PhotoData = {
  title: string;
  image: File | undefined;
  [key: string]: any;
};

const Profile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const { user: userAuth } = useAppSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useAppSelector((state) => state.photo);

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File>();

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const [isHide, setIsHide] = useState(false);

  const messageTimeout = useRef<number | null>(null);

  const resetComponentMessage = () => {
    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current);
    }

    messageTimeout.current = window.setTimeout(() => {
      dispatch(resetMessage());
      messageTimeout.current = null;
    }, 2000);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const photoData: PhotoData = {
      title,
      image,
    };

    const formData = new FormData();
    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );
    await dispatch(publishPhoto(formData));

    resetComponentMessage();
  };

  const handleDeletePhoto = (photoId: string) => {
    dispatch(deletePhoto(photoId));
    resetComponentMessage();
  };

  const handleEdit = (photo: LocalPhoto) => {
    setIsHide(true);
    setEditTitle(photo.title);
    setEditImage(photo.image);
    setEditId(photo._id);
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const photoData = {
      title: editTitle,
      _id: editId,
    };
    await dispatch(updatePhoto(photoData));
    if (id) {
      dispatch(getUserPhotos(id));
    }
    setIsHide(false);
    resetComponentMessage();
  };

  const handleCancelEdit = () => {
    setIsHide(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
      dispatch(getUserPhotos(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      if (messageTimeout.current) {
        clearTimeout(messageTimeout.current);
      }
    };
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="bg-black text-white w-[600px] h-fit rounded-b-xl">
      <div className="flex m-4">
        {user?.profileImage && (
          <img
            className="rounded-[50%] w-40"
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
          />
        )}
        <div className="ml-4 m-5">
          <h2 className="font-bold text-3xl mb-4">{user?.name}</h2>
          <p className="font-semibold">{user?.bio}</p>
        </div>
      </div>
      <hr className="text-gray-400" />
      {id === userAuth?._id && (
        <>
          {!isHide ? (
            <div id="newPhoto" className="m-4 mb-4">
              <h3 className="font-bold text-[19px]">
                Compartilhe algum momento seu:
              </h3>
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <label>
                  <span className="text-gray-400">Título para a foto</span>
                  <input
                    className="bg-gray-600 indent-1 p-1 w-full"
                    type="text"
                    placeholder="Insira um título"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title || ""}
                  />
                </label>
                <label>
                  <span className="text-gray-400">Imagem:</span>
                  <input
                    className="bg-gray-600 indent-1 p-1 w-full"
                    type="file"
                    onChange={handleFile}
                  />
                </label>
                <AppButton
                  label={loadingPhoto ? "Aguarde..." : "Postar"}
                  buttonType={loadingPhoto ? "loading" : "default"}
                />
              </form>
            </div>
          ) : (
            <div id="editPhoto">
              <div className="flex justify-center m-2">
                <img
                  src={`${uploads}/photos/${editImage}`}
                  alt={editTitle}
                ></img>
              </div>

              <form className="flex flex-col m-2" onSubmit={handleUpdate}>
                <span className="mt-2">Escolha um novo título: </span>
                <input
                  className="bg-gray-600 indent-1 p-1 w-full"
                  type="text"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle || ""}
                />

                <AppButton label={"Editar"} buttonType={"default"} />
                <button onClick={handleCancelEdit}>Cancelar edição</button>
              </form>
            </div>
          )}

          <hr className="my-2 text-gray-400" />
          {errorPhoto && <Message msg={errorPhoto} typeMessage="error" />}
          {messagePhoto && <Message msg={messagePhoto} typeMessage="message" />}
        </>
      )}
      <div id="postedPhotos">
        <h2 className="block font-bold text-2xl ml-4 mb-3">
          Fotos publicadas:
        </h2>
        <div className="flex flex-wrap m-4">
          {photos &&
            photos.map((photo) => (
              <div className="w-[250px] m-1" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth?._id ? (
                  <div className="flex m-2 justify-evenly">
                    <Link to={`/photos/${photo._id}`}>
                      <IoEyeSharp className="cursor-pointer" />
                    </Link>
                    <FaPen
                      className="cursor-pointer"
                      onClick={() => handleEdit(photo)}
                    />
                    <BsXLg
                      className="cursor-pointer"
                      onClick={() => handleDeletePhoto(photo._id)}
                    />
                  </div>
                ) : (
                  <Link to={`/photos/${photo._id}`}>Ver</Link>
                )}
              </div>
            ))}
        </div>
        {photos?.length === 0 && <p>Ainda não há fotos publicadas.</p>}
      </div>
    </div>
  );
};

export default Profile;
