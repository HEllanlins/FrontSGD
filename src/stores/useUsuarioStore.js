import { create } from 'zustand';

const initialState = {
  id: null,
  nome: '',
  cargo: '',
  email: '',
  isLogged: false
};

export const useUsuarioStore = create(set => ({
  usuario: initialState,
  setUsuario: usuario => set({ usuario }),
  clearUsuario: () => set({ usuario: initialState })
}));
