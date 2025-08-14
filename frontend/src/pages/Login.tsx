import { useEffect, useState, type FormEvent } from "react";
import { login, reset } from "../slices/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { Link } from "react-router-dom";
import FormLayout from "../layouts/FormLayout";
import InputField from "../components/InputField";
import AppButton from "../components/AppButton";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <FormLayout
      title="ReactGram"
      subTitle="Faça o login para ver o que há de novo."
      onSubmit={handleSubmit}
    >
      <div className="w-[500px]">
        <div className="mx-6">
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
          <AppButton
            label={!loading ? "Entrar" : "Aguarde..."}
            buttonTypeStyle={!loading ? "default" : "loading"}
          />

          <hr className="border-gray-600  text-center w-full" />
          <p className="text-center font-semibold my-4">
            Não tem uma conta?{" "}
            <Link
              className="text-indigo-600  hover:text-indigo-800 font-bold"
              to="/register"
            >
              Clique aqui
            </Link>
          </p>
        </div>
      </div>
    </FormLayout>
  );
};

export default Login;
