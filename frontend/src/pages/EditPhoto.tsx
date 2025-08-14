import { useEffect, useState, type FormEvent } from "react";
import ProfileCard from "../components/ProfileCard";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { useNavigate, useParams } from "react-router-dom";
import { getPhotoById, updatePhoto } from "../slices/photoSlice";
import FormLayout from "../layouts/FormLayout";
import InputField from "../components/InputField";
import AppButton from "../components/AppButton";
import { useResetMessage } from "../hooks/useResetMessage";
import PhotoComponent from "../components/PhotoComponent";

const EditPhoto = () => {
  const { photoId } = useParams();
  const dispatch = useAppDispatch();
  const { photo, loading: loadingPhoto } = useAppSelector(
    (state) => state.photo
  );

  const { user, loading } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const [editTitle, setEditTitle] = useState("");
  const { resetMessage } = useResetMessage("photo");
  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      title: editTitle,
      _id: photo?._id,
    };
    dispatch(updatePhoto(formData));
    navigate(`/users/${user?._id}`);
  };
  useEffect(() => {
    if (photoId) {
      dispatch(getPhotoById(photoId));
    }
  }, [dispatch, photoId]);
  useEffect(() => {
    if (photo) {
      setEditTitle(photo.title);
    }
  }, [dispatch, photo]);
  useEffect(() => {
    return () => {
      resetMessage();
    };
  }, []);

  return (
    <div className="bg-black text-white w-[600px] rounded-b-xl">
      <ProfileCard user={user} />
      <hr className="text-gray-400" />
      <div className="flex justify-center m-1">
        <PhotoComponent photo={photo} alt={editTitle} />
      </div>
      <FormLayout onSubmit={handleEditSubmit}>
        <div className="mx-6">
          <InputField
            label="Escolha um novo título:"
            type="text"
            onChange={(e) => setEditTitle(e.target.value)}
            value={editTitle || ""}
          />
          <div className="flex gap-4 justify-center">
            <AppButton
              label={loading ? "Aguarde..." : "Editar"}
              buttonTypeStyle={loading || loadingPhoto ? "loading" : "default"}
            />
          </div>
        </div>
      </FormLayout>
    </div>
  );
};

export default EditPhoto;
