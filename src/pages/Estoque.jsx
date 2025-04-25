import { useState } from "react";
import Nav from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";

const Estoque = () => {
  const [produtos, setProdutos] = useState([
    {
      nome: "Inseticida Aerossol",
      categoria: "Químicos",
      quantidade: 20,
      preco: "R$ 15,00",
      status: "Disponível",
      data: "21/04/2025",
    },
    {
      nome: "Gel Mata Baratas",
      categoria: "Químicos",
      quantidade: 10,
      preco: "R$ 25,00",
      status: "Baixo",
      data: "20/04/2025",
    },
    {
      nome: "Raticida Granulado",
      categoria: "Químicos",
      quantidade: 5,
      preco: "R$ 35,00",
      status: "Baixo",
      data: "19/04/2025",
    },
    {
      nome: "Equipamento de Pulverização",
      categoria: "Equipamentos",
      quantidade: 3,
      preco: "R$ 1.200,00",
      status: "Disponível",
      data: "18/04/2025",
    },
    {
      nome: "Máscara de Proteção",
      categoria: "EPIs",
      quantidade: 0,
      preco: "R$ 18,00",
      status: "Esgotado",
      data: "17/04/2025",
    },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleEdit = (produto) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  const handleDelete = (produto) => {
    const confirm = window.confirm(`Deseja excluir ${produto.nome}?`);
    if (confirm) {
      const atualizados = produtos.filter((p) => p !== produto);
      setProdutos(atualizados);
    }
  };

  const handleAdd = () => {
    setProdutoSelecionado(null); // Modal virá limpo
    setModalOpen(true);
  };

  const handleSave = (produtoEditado) => {
    if (produtoSelecionado) {
      // Edição
      const atualizados = produtos.map((p) => (p === produtoSelecionado ? produtoEditado : p));
      setProdutos(atualizados);
    } else {
      // Novo produto
      setProdutos([...produtos, produtoEditado]);
    }
  };

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Gerenciamento de Estoque</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <div className="flex gap-2">
            <FilterDropdown label="Categorias" />
            <FilterDropdown label="Status" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAdd}>
              ➕ Adicionar Produto
            </button>
          </div>
        </div>
        <ProductTable produtos={produtos} onEdit={handleEdit} onDelete={handleDelete} />
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
