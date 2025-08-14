import { useEffect, useState, type FormEvent } from "react";
import { register, reset } from "../slices/authSlice";
import AppButton from "../components/AppButton";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import FormLayout from "../layouts/FormLayout";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  return (
    <FormLayout
      title="ReactGram"
      subTitle="Cadastre-se para ver as fotos dos seus amigos."
      onSubmit={handleSubmit}
    >
      <div className="w-[500px]">
        <div className="mx-6">
          <InputField
            label="Nome"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoComplete="name"
          />
          <InputField
            label="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
          />
          <InputField
            label="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="current-password"
          />
          <InputField
            label="Confirme a senha"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            autoComplete="new-password"
          />
          <AppButton
            label={!loading ? "Cadastrar" : "Aguarde..."}
            buttonTypeStyle={!loading ? "default" : "loading"}
          />

          <hr className="border-gray-600  text-center w-full" />
          <p className="text-center font-semibold my-4">
            Já possui uma conta?{" "}
            <Link
              className="text-indigo-600  hover:text-indigo-800 font-bold"
              to="/login"
            >
              Clique aqui
            </Link>
          </p>
        </div>
      </div>
    </FormLayout>
  );
};

export default Register;
