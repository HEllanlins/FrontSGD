import { create } from "zustand";

const useClienteStore = create((set) => ({
  clientes: [],
  addCliente: (cliente) => set((state) => ({ clientes: [...state.clientes, cliente] })),
  removeCliente: (id) => set((state) => ({ clientes: state.clientes.filter((c) => c.id !== id) })),
  updateCliente: (id, updatedCliente) =>
    set((state) => ({
      clientes: state.clientes.map((c) => (c.id === id ? { ...c, ...updatedCliente } : c)),
    })),
}));

export default useClienteStore;
