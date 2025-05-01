import { create } from "zustand";
import api from "../services/axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const useUsuarioStore = create((set, get) => ({
  usuario: {
    id: null,
    cargo: "",
    nome: "",
    email: "",
    senha: "",
    isLogged: localStorage.getItem("isLogged") === "true",
  },

  login: async (email, senha) => {
    try {
      const response = await api.post("/login", { email, senha });
      const token = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("isLogged", "true");
      const payload = jwtDecode(token);
      set({
        usuario: {
          id: payload.userId,
          nome: payload.userName,
          cargo: payload.userRole,
          email: email,
          senha: "",
          isLogged: true,
        },
      });
      console.log(get().usuario);
      return {
        id: payload.userId,
        nome: payload.userName,
        cargo: payload.userRole,
        email: email,
      };
    } catch (error) {
      localStorage.setItem("isLogged", "false");
      set({
        usuario: {
          id: null,
          nome: "",
          cargo: "",
          email: "",
          senha: "",
          isLogged: false,
        },
      });
      console.log(error);
      toast.error("Usuário ou senha inválidos");
      throw error;
    }
  },

  register: async ({ nome, cargo, email, senha }) => {
    try {
      const response = await api.post("/register", {
        nome,
        cargo,
        email,
        senha,
      });
      toast.success("Cadastro realizado com sucesso! Faça login.");
      return response.data;
    } catch (error) {
      toast.error("Erro ao cadastrar usuário");
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      usuario: {
        id: null,
        nome: "",
        cargo: "",
        email: "",
        senha: "",
      },
    });
  },
}));
