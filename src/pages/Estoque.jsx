import { useState, useEffect } from "react";
import useProdutoStore from "../stores/useProdutoStore";
import Nav from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import StatusBadge from "../components/StatusBadge";
import api from "../services/axios";
import ProductModal from "../components/ProductModal";
import { toast } from "react-toastify";

const Estoque = () => {
  const produtos = useProdutoStore((state) => state.produtos);
  const setProdutos = useProdutoStore((state) => state.setProdutos);
  const addProduto = useProdutoStore((state) => state.addProduto);
  const updateProduto = useProdutoStore((state) => state.updateProduto);
  const removeProduto = useProdutoStore((state) => state.removeProduto);

  const [isModalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleEdit = (produto) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get("/produto");
        const produtosComId = response.data.map((p) => ({
          ...p,
          id: p.id_produto,
          quantidade: p.qtd_estoque,
        }));
        setProdutos(produtosComId);
      } catch (err) {
        toast.error("Erro ao carregar os produtos");
        console.error(err);
        setProdutos([]);
      }
    }
    fetchProdutos();
  }, [setProdutos]);

  const handleDelete = async (produto) => {
    if (window.confirm(`Deseja excluir ${produto.nome}?`)) {
      try {
        await api.delete(`/produto/${produto.id}`);
        removeProduto(produto.id);
        toast.success("Produto excluído com sucesso");
      } catch (error) {
        toast.error("Erro ao excluir o produto");
        console.error(error);
      }
    }
  };

  const handleAdd = () => {
    setProdutoSelecionado(null);
    setModalOpen(true);
  };

  const handleSave = async (produtoEditado) => {
    if (produtoSelecionado && produtoEditado.id) {
      // Edição
      try {
        await api.put(`/produto/${produtoEditado.id}`, produtoEditado);
        updateProduto(produtoEditado.id, {
          ...produtoEditado,
          quantidade: produtoEditado.qtd_estoque,
        });
      } catch (error) {
        toast.error("Erro ao editar o produto");
        console.error(error);
      }
    } else {
      // Novo produto
      try {
        console.log(produtoEditado);
        const response = await api.post("/produto", produtoEditado);
        addProduto({
          ...produtoEditado,
          id: response.data.id,
          quantidade: produtoEditado.qtd_estoque,
        });
      } catch (error) {
        toast.error("Erro ao adicionar produto");
        console.error(error);
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          Gerenciamento de Estoque
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleAdd}
            >
              ➕ Adicionar Produto
            </button>
          </div>
        </div>
        <Table
          title="Produtos em Estoque"
          headers={[
            { label: "Produto", key: "nome" },
            { label: "Categoria", key: "categoria" },
            { label: "Quantidade", key: "quantidade" },
            { label: "Preço Unit.", key: "preco" },
            {
              label: "Status",
              key: "status",
              render: (row) => <StatusBadge status={row.status} />,
            },
            { label: "Última Atualização", key: "ultima_atualizacao" },
          ]}
          data={produtos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal de edição/adição */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={produtoSelecionado}
      />
    </>
  );
};

export default Estoque;
