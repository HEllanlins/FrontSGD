import { create } from "zustand";

const useProdutoStore = create((set) => ({
  produtos: [],
  addProduto: (produto) => set((state) => ({ produtos: [...state.produtos, produto] })),
  removeProduto: (id) =>
    set((state) => ({
      produtos: state.produtos.filter((produto) => produto.id !== id),
    })),
  updateProduto: (id, dadosAtualizados) =>
    set((state) => ({
      produtos: state.produtos.map((produto) => (produto.id === id ? { ...produto, ...dadosAtualizados } : produto)),
    })),
}));

export default useProdutoStore;
