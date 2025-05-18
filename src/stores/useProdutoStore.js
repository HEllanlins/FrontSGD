import { create } from "zustand";

const initialState = {
  produtos: [],
};

export const useProdutoStore = create((set) => ({
  ...initialState,
  setProdutos: (produtos) => set({ produtos }),
  addProduto: (produto) => set((state) => ({ produtos: [...state.produtos, produto] })),
  updateProduto: (id, dadosAtualizados) =>
    set((state) => ({
      produtos: state.produtos.map((produto) => (produto.id === id ? { ...produto, ...dadosAtualizados } : produto)),
    })),
  removeProduto: (id) =>
    set((state) => ({
      produtos: state.produtos.filter((produto) => produto.id !== id),
    })),
  clearProdutos: () => set(initialState),
}));
