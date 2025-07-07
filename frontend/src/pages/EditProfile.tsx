import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { profile, resetMessage, updateProfile } from "../slices/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { uploads } from "../utils/config";
import AppButton from "../components/AppButton";
import Message from "../components/Message";

const EditProfile = () => {
  const dispatch = useAppDispatch();

  const { user, message, error, loading } = useAppSelector(
    (state) => state.user
  );
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bio, setBio] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setBio(user?.bio || "");
      setEmail(user?.email || "");
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: { [key: string]: any } = { name };
    if (profileImage) {
      userData.profileImage = profileImage;
    }
    if (bio) {
      userData.bio = bio;
    }
    if (password) {
      userData.password = password;
    }
    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      setPreviewImage(image);
      setProfileImage(image);
    }
  };

  return (
    <div className="bg-black text-white rounded-xl m-4">
      <h1 className="text-center text-[30px] my-6 font-bold">
        Edite seus dados
      </h1>
      <div className="w-[600px] m-15 mt-0">
        <h2 className="font-semibold text-center mb-4">
          Adicione uma imagem de perfil e conte mais sobre você...
        </h2>

        {(user?.profileImage || previewImage) && (
          <div className="flex justify-center">
            <img
              className="w-50 rounded-[50%]"
              src={
                previewImage
                  ? URL.createObjectURL(previewImage)
                  : `${uploads}/users/${user?.profileImage}`
              }
              alt={user?.name}
            />
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>
            <span>Nome:</span>
            <input
              className="bg-gray-600 indent-1 p-1 w-full"
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            <span>E-mail:</span>
            <input
              className="bg-gray-600 indent-1 p-1 w-full"
              type="email"
              placeholder="E-mail"
              disabled
              value={email}
            />
          </label>
          <label>
            <span>Imagem de Perfil:</span>
            <input
              className="bg-gray-600 indent-1 p-1 w-full"
              type="file"
              onChange={handleFile}
            />
          </label>
          <label>
            <span>Bio:</span>
            <input
              className="bg-gray-600 indent-1 w-full p-1"
              type="text"
              placeholder="Descrição do perfil"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </label>
          <label>
            <span>Quer alterar sua senha?</span>
            <input
              className="bg-gray-600 indent-1 p-1 w-full"
              type="password"
              placeholder="Digite sua nova senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <AppButton
            label={loading ? "Aguarde..." : "Atualizar"}
            buttonType={loading ? "loading" : "default"}
          />
          {error && <Message msg={error} typeMessage="error" />}
          {message && <Message msg={message} typeMessage="message" />}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
