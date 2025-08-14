import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { getUserById } from "../slices/userSlice";
import { deletePhoto, getUserPhotos, publishPhoto } from "../slices/photoSlice";
import AppButton from "../components/AppButton";
import { useResetMessage } from "../hooks/useResetMessage";
import FormLayout from "../layouts/FormLayout";
import InputField from "../components/InputField";
import PostedPhotos from "../components/PostedPhotos";
import type { PublishPhotoFormData } from "../types/photo";
import ProfileCard from "../components/ProfileCard";

const PhotoDashboard = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { user: authUser } = useAppSelector((state) => state.auth);
  const { photos, loading: loadingPhoto } = useAppSelector(
    (state) => state.photo
  );
  const { resetMessage } = useResetMessage("photo");

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const photoData: PublishPhotoFormData = {
      title,
      image,
    };
    const formData = new FormData();
    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );
    await dispatch(publishPhoto(formData as any));
    resetMessage();
    setTitle("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const handleDelete = (photoId: string) => {
    dispatch(deletePhoto(photoId));
    resetMessage();
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
      dispatch(getUserPhotos(id));
    }
  }, [dispatch, id]);
  return (
    <div className="bg-black text-white w-[600px] rounded-b-xl">
      <ProfileCard user={user} />
      <hr className="text-gray-400" />
      {id === authUser?._id && (
        <>
          <FormLayout
            title="Compartilhe algum momento seu:"
            onSubmit={handleSubmit}
          >
            <div className="mx-6">
              <InputField
                label="Título para a foto:"
                placeholder="Insira um título"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title || ""}
              />
              <InputField
                label="Imagem:"
                type="file"
                onChange={handleFileChange}
                imageName={image?.name}
              />
              <AppButton
                label={loadingPhoto ? "Aguarde..." : "Postar"}
                buttonTypeStyle={loadingPhoto ? "loading" : "default"}
              />
            </div>
          </FormLayout>

          <hr className="my-2 text-gray-400" />
        </>
      )}

      <PostedPhotos
        photos={photos}
        userIdParams={id}
        authUser={authUser}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default PhotoDashboard;
