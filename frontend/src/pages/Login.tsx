import { useEffect, useState, type FormEvent } from "react";
import { login, reset } from "../slices/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import AppButton from "../components/AppButton";
import Message from "../components/Message";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, error } = useAppSelector((state) => state.auth);

  const dispath = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispath(login(user));
  };

  useEffect(() => {
    dispath(reset());
  }, [dispath]);

  return (
    <div className="bg-black text-white rounded-xl">
      <h1 className="text-center text-[30px] my-6 font-bold">ReactGram</h1>
      <div className="w-[400px] m-15 mt-0">
        <h2 className="font-semibold text-center mb-4">
          Faça seu login para ver o que há de novo.
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="password"
            placeholder="Senha"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <AppButton
            label={loading ? "Aguarde..." : "Login"}
            buttonType={loading ? "loading" : "default"}
          />
          {error && <Message msg={error} typeMessage="error" />}
        </form>
        <hr className="border-gray-600 m-4 mx-0 text-center w-full" />

        <p className="text-center font-semibold">
          Não tem uma conta?{" "}
          <a className="text-blue-400 font-bold" href="/register">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
