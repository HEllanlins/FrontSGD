import { create } from "zustand";

const useVeiculoStore = create((set) => ({
  veiculos: [],
  addVeiculo: (veiculo) =>
    set((state) => ({ veiculos: [...state.veiculos, veiculo] })),
  setVeiculos: (veiculos) => set({ veiculos }),
  removeVeiculo: (id) =>
    set((state) => ({
      veiculos: state.veiculos.filter((veiculo) => veiculo.id !== id),
    })),
  updateVeiculo: (id, updatedVeiculo) =>
    set((state) => ({
      veiculos: state.veiculos.map((veiculo) =>
        veiculo.id === id ? { ...veiculo, ...updatedVeiculo } : veiculo
      ),
    })),
}));

export default useVeiculoStore;
