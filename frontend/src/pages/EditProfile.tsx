import { type FormEvent } from "react";

const EditProfile = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>
            <span>Nome:</span>
            <input
              className="bg-gray-600 indent-1 p-1 w-full"
              type="text"
              placeholder="Nome"
            />
          </label>
          <label>
            <span>E-mail:</span>
            <input
              className="bg-gray-600 indent-1 p-1 w-full"
              type="email"
              placeholder="E-mail"
              disabled
            />
          </label>
          <label>
            <span>Imagem de Perfil:</span>
            <input className="bg-gray-600 indent-1 p-1 w-full" type="file" />
          </label>
          <label>
            <span>Bio:</span>
            <input
              className="bg-gray-600 indent-1 w-full p-1"
              type="text"
              placeholder="Descrição do perfil"
            />
          </label>
          <label>
            <span>Quer alterar sua senha?</span>
            <input
              className="bg-gray-600 indent-1 p-1 w-full"
              type="password"
              placeholder="Digite sua nova senha"
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
