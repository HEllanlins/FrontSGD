import React, { useState, useEffect } from "react";
import { useProduto } from "../hooks/useProduto";
import Nav from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import StatusBadge from "../components/StatusBadge";
import ProductModal from "../components/ProductModal";
import { toast } from "react-toastify";

const Estoque = () => {
  // Hook customizado para produtos
  const { produtos, loading, createProduto, editProduto, deleteProduto } = useProduto();

  // Estados locais
  const [isModalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Definir título da página
  useEffect(() => {
    document.title = "SGD - Estoque";
  }, []);

  // Adicionar produto
  const handleAdd = () => {
    setProdutoSelecionado(null);
    setModalOpen(true);
  };

  // Editar produto
  const handleEdit = (produto) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  // Excluir produto
  const handleDelete = async (produto) => {
    if (window.confirm(`Deseja excluir ${produto.nome}?`)) {
      try {
        await deleteProduto(produto.id);
        toast.success("Produto excluído com sucesso");
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        toast.error("Erro ao excluir produto");
      }
    }
  };

  // Salvar produto (criar ou editar)
  const handleSave = async (produtoEditado) => {
    try {
      if (produtoSelecionado && produtoSelecionado.id) {
        await editProduto(produtoSelecionado.id, produtoEditado);
        toast.success("Produto editado com sucesso");
      } else {
        await createProduto(produtoEditado);
        toast.success("Produto adicionado com sucesso");
      }
      setModalOpen(false);
      setProdutoSelecionado(null);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast.error("Erro ao salvar produto");
    }
  };

  // Fechar modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setProdutoSelecionado(null);
  };

  // Estado de carregamento
  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Carregando produtos...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Gerenciamento de Estoque</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleAdd}
          >
            ➕ Adicionar Produto
          </button>
        </div>

        <Table
          title="Produtos em Estoque"
          headers={[
            { label: "Produto", key: "nome" },
            { label: "Categoria", key: "categoria" },
            { label: "Quantidade", key: "qtd_estoque" },
            { label: "Preço Unit.", key: "preco" },
            { 
              label: "Status", 
              key: "status", 
              render: (row) => <StatusBadge status={row.status} />
            },
            { label: "Última Atualização", key: "ultima_atualizacao" }
          ]}
          data={produtos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={produtoSelecionado}
      />
    </>
  );
};

export default Estoque;
