const Register = () => {
  return (
    <div className="bg-black rounded-xl text-white">
      <h1 className="text-center text-[30px] my-6 font-bold">ReactGram</h1>
      <div className="w-[400px] m-15 mt-0">
        <h2 className="font-semibold text-center mb-4">
          Cadastre-se para ver as fotos dos seus amigos.
        </h2>
        <form className="flex flex-col gap-3">
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="text"
            placeholder="Nome"
          />
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="email"
            placeholder="E-mail"
          />
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="password"
            placeholder="Senha"
          />
          <input
            className="bg-gray-600 indent-1 rounded-sm"
            type="password"
            placeholder="Confirme a senha"
          />
          <button
            className="bg-blue-500 mt-2 text-[20px] rounded-sm font-bold p-1"
            type="submit"
          >
            Cadastrar
          </button>
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
