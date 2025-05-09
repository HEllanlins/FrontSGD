import { useState } from 'react';
import { useProduto } from '../hooks/useProduto';
import Nav from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import StatusBadge from '../components/StatusBadge';
import ProductModal from '../components/ProductModal';
import { toast } from 'react-toastify';

const Estoque = () => {
  const { produtos, loading, createProduto, editProduto, deleteProduto } = useProduto();

  const [isModalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleEdit = produto => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  const handleDelete = async produto => {
    if (window.confirm(`Deseja excluir ${produto.nome}?`)) {
      try {
        await deleteProduto(produto.id);
        toast.success('Produto excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir o produto');
        console.error(error);
      }
    }
  };

  const handleAdd = () => {
    setProdutoSelecionado(null);
    setModalOpen(true);
  };

  const handleSave = async produtoEditado => {
    if (produtoSelecionado && produtoEditado.id) {
      // Edição
      try {
        await editProduto(produtoEditado.id, produtoEditado);
      } catch (error) {
        toast.error('Erro ao editar o produto');
        console.error(error);
      }
    } else {
      // Novo produto
      try {
        await createProduto(produtoEditado);
      } catch (error) {
        toast.error('Erro ao adicionar produto');
        console.error(error);
      }
    }
  };

  if (loading) return <div>Carregando produtos...</div>;

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Gerenciamento de Estoque</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAdd}>
              ➕ Adicionar Produto
            </button>
          </div>
        </div>
        <Table
          title="Produtos em Estoque"
          headers={[
            { label: 'Produto', key: 'nome' },
            { label: 'Categoria', key: 'categoria' },
            { label: 'Quantidade', key: 'qtd_estoque' },
            { label: 'Preço Unit.', key: 'preco' },
            {
              label: 'Status',
              key: 'status',
              render: row => <StatusBadge status={row.status} />
            },
            { label: 'Última Atualização', key: 'ultima_atualizacao' }
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
