import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { profile, updateProfile } from "../slices/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { uploads } from "../utils/config";
import AppButton from "../components/AppButton";
import FormLayout from "../layouts/FormLayout";
import InputField from "../components/InputField";
import { useResetMessage } from "../hooks/useResetMessage";

const EditProfile = () => {
  const dispatch = useAppDispatch();

  const { user, loading } = useAppSelector((state) => state.user);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const { resetMessage } = useResetMessage("user");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    dispatch(updateProfile(formData as any));

    resetMessage();
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      setPreviewImage(image);
      setProfileImage(image);
    }
  };

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <FormLayout
      title="Edite seus dados"
      subTitle="Adicione uma imagem de perfil e conte mais sobre você..."
      onSubmit={handleSubmit}
    >
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
      <div className="w-[500px]">
        <div className="mx-6">
          <InputField
            label="Nome:"
            type="text"
            placeholder="nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoComplete="name"
          />
          <InputField
            label="E-mail:"
            type="email"
            placeholder="E-mail"
            disabled
            value={email}
          />
          <InputField
            label="Imagem de Perfil:"
            type="file"
            onChange={handleFile}
            imageName={profileImage?.name}
          />
          <InputField
            label="Bio:"
            type="text"
            autoComplete="bio"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
          <InputField
            label="Quer alterar sua senha?"
            type="password"
            autoComplete="new-password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <AppButton
            label={loading ? "Aguarde..." : "Atualizar"}
            buttonTypeStyle={loading ? "loading" : "default"}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default EditProfile;
