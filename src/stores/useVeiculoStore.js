import { create } from "zustand";

const initialState = {
  veiculos: [],
};

const useVeiculoStore = create((set) => ({
  veiculos: initialState,

  setVeiculos: (veiculos) => set({ veiculos }),

  addVeiculo: (veiculo) => set((state) => ({ veiculos: [...state.veiculos, veiculo] })),

  removeVeiculo: (id) =>
    set((state) => ({
      veiculos: state.veiculos.filter((veiculo) => veiculo.id !== id),
    })),

  updateVeiculo: (id, updatedVeiculo) =>
    set((state) => ({
      veiculos: state.veiculos.map((veiculo) => (veiculo.id === id ? { ...veiculo, ...updatedVeiculo } : veiculo)),
    })),

  clearVeiculos: () => set(initialState),
}));

export default useVeiculoStore;
