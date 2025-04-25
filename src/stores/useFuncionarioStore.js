import { create } from "zustand";

const useFuncionarioStore = create((set) => ({
  funcionarios: [],
  addFuncionario: (funcionario) =>
    set((state) => ({
      funcionarios: [...state.funcionarios, funcionario],
    })),
  removeFuncionario: (id) =>
    set((state) => ({
      funcionarios: state.funcionarios.filter((f) => f.id !== id),
    })),
  updateFuncionario: (id, updatedFuncionario) =>
    set((state) => ({
      funcionarios: state.funcionarios.map((f) => (f.id === id ? { ...f, ...updatedFuncionario } : f)),
    })),
}));

export default useFuncionarioStore;
