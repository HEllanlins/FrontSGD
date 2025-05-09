import { create } from 'zustand';

export const useUsuarioStore = create(set => ({
  usuario: {
    id: null,
    cargo: '',
    nome: '',
    email: '',
    isLogged: false
  },

  updateUsuario: dados => {
    set(state => ({
      usuario: {
        ...state.usuario,
        ...dados
      }
    }));
  },

  logout: () => {
    set({
      usuario: {
        id: null,
        nome: '',
        cargo: '',
        email: '',
        isLogged: false
      }
    });
  }
}));
