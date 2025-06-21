import { useEffect, useState, type FormEvent } from "react";

import { register, reset } from "../slices/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import AppButton from "../components/AppButton";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispath = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispath(register(user));
  };
  useEffect(() => {
    dispath(reset());
  }, [dispath]);
  return (
    <div className="bg-black rounded-xl text-white">
      <h1 className="text-center text-[30px] my-6 font-bold">ReactGram</h1>
      <div className="w-[400px] m-15 mt-0">
        <h2 className="font-semibold text-center mb-4">
          Cadastre-se para ver as fotos dos seus amigos.
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="text"
            placeholder="Nome"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="password"
            placeholder="Senha"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="password"
            placeholder="Confirme a senha"
            autoComplete="conf-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <AppButton
            label={!loading ? "Cadastrar" : "Aguarde..."}
            buttonType={!loading ? "default" : "loading"}
          />
          {error && <ErrorMessage msg={error} />}
        </form>
        <hr className="border-gray-600 m-4 mx-0 text-center w-full" />

        <p className="text-center font-semibold">
          Já possui uma conta?{" "}
          <a className="text-blue-400 font-bold" href="/login">
            Clique aqui
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
