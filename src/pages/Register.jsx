import { useState, useEffect } from "react";
import { useUsuarioStore } from "../stores/useUsuarioStore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  useEffect(() => {
    document.title = "SGD - Registro";
  });

  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const register = useUsuarioStore((state) => state.register);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setCargo("Admin");
      await register({ nome, cargo, email, senha });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-blue-200 flex justify-center items-center min-h-screen p-20">
      <div className="w-full max-w-4xl bg-gray-200 mx-10 flex rounded-lg shadow-lg">
        <div className="bg-blue-600 w-1/3 flex flex-col justify-center p-5 rounded-l-lg text-white">
          <h1 className="text-4xl text-center font-bold">SGD</h1>
          <p className="mt-10 text-center text-sm">Faça seu cadastro para acessar a plataforma.</p>
        </div>
        <div className="w-2/3 flex flex-col justify-center p-10 rounded-r-lg">
          <h1 className="text-3xl text-center font-black">Cadastro</h1>
          <form className="flex flex-col items-center w-full mt-6 space-y-5" onSubmit={handleRegister}>
            <div className="w-2/3 flex flex-col gap-2">
              <label className="font-medium">Nome</label>
              <input
                className="border-gray-400 border-2 py-2 px-3 rounded-sm w-full"
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="w-2/3 flex flex-col gap-2">
              <label className="font-medium">Email</label>
              <input
                className="border-gray-400 border-2 py-2 px-3 rounded-sm w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-2/3 flex flex-col gap-2">
              <label className="font-medium">Senha</label>
              <input
                className="border-gray-400 border-2 py-2 px-3 rounded-sm w-full"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <button className="w-2/3 bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700 transition">
              Cadastrar
            </button>
            <span>
              Já tem conta?
              <a href="/login" className="text-blue-600 text-sm hover:underline ml-1">
                Faça login
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
