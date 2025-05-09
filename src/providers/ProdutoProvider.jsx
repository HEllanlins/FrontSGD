import PropTypes from 'prop-types';
import { useProdutoStore } from '../stores/useProdutoStore';
import { ProdutoContext } from '../contexts/ProdutoContext';
import { useState, useEffect, useCallback } from 'react';
import api from '../services/axios';

export function ProdutoProvider({ children }) {
  const { produtos, setProdutos, addProduto, updateProduto, removeProduto, clearProdutos } = useProdutoStore();
  const [loading, setLoading] = useState(true);

  // Carregar produtos do backend ao iniciar
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get('/produto');
        setProdutos(response.data);
      } catch {
        setProdutos([]);
      }
      setLoading(false);
    }
    fetchProdutos();
  }, [setProdutos]);

  // Métodos para manipular produtos
  const createProduto = useCallback(
    async dados => {
      const response = await api.post('/produto', dados);
      addProduto(response.data);
      return response.data;
    },
    [addProduto]
  );

  const editProduto = useCallback(
    async (id, dados) => {
      const response = await api.put(`/produto/${id}`, dados);
      updateProduto(id, response.data);
      return response.data;
    },
    [updateProduto]
  );

  const deleteProduto = useCallback(
    async id => {
      await api.delete(`/produto/${id}`);
      removeProduto(id);
    },
    [removeProduto]
  );

  const value = {
    produtos,
    loading,
    createProduto,
    editProduto,
    deleteProduto,
    setProdutos,
    clearProdutos
  };

  if (loading) return <div>Carregando produtos...</div>;

  return <ProdutoContext.Provider value={value}>{children}</ProdutoContext.Provider>;
}

ProdutoProvider.propTypes = {
  children: PropTypes.node.isRequired
};
