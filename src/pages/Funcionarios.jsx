import React, { useState, useEffect } from "react";
import { useFuncionario } from "../hooks/useFuncionario";
import Nav from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import FuncionarioModal from "../components/FuncionarioModal";
import { toast } from "react-toastify";

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "inativo":
        return "bg-red-100 text-red-800";
      case "férias":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const Funcionarios = () => {
  const { funcionarios, loading, createFuncionario, editFuncionario, deleteFuncionario } = useFuncionario();
  const [isModalOpen, setModalOpen] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    document.title = "SGD - Funcionários";
  }, []);

  const handleEdit = (funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setModalOpen(true);
  };

  const handleDelete = async (funcionario) => {
    if (window.confirm(`Deseja excluir ${funcionario.nome}?`)) {
      try {
        await deleteFuncionario(funcionario.id);
        toast.success("Funcionário excluído com sucesso");
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
        toast.error("Erro ao excluir funcionário");
      }
    }
  };

  const handleAdd = () => {
    setFuncionarioSelecionado(null);
    setModalOpen(true);
  };

  const handleSave = async (funcionarioEditado) => {
    try {
      if (funcionarioSelecionado && funcionarioSelecionado.id) {
        await editFuncionario(funcionarioSelecionado.id, funcionarioEditado);
        toast.success("Funcionário editado com sucesso");
      } else {
        await createFuncionario(funcionarioEditado);
        toast.success("Funcionário criado com sucesso");
      }
      setModalOpen(false);
      setFuncionarioSelecionado(null);
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
      toast.error("Erro ao salvar funcionário");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFuncionarioSelecionado(null);
  };

  const funcionariosFiltrados = funcionarios?.filter(
    (f) =>
      f.nome.toLowerCase().includes(busca.toLowerCase()) ||
      f.cargo.toLowerCase().includes(busca.toLowerCase()) ||
      f.email.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Carregando funcionários...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Gerenciamento de Funcionários</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar value={busca} onChange={setBusca} />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleAdd}
          >
            ➕ Adicionar Funcionário
          </button>
        </div>

        <Table
          title="Funcionários Cadastrados"
          headers={[
            { label: "Nome", key: "nome" },
            { label: "Cargo", key: "cargo" },
            { label: "E-mail", key: "email" },
            { label: "Data de Admissão", key: "data_admissao" },
            {
              label: "Status",
              key: "status",
              render: (row) => <StatusBadge status={row.status} />,
            },
          ]}
          data={funcionariosFiltrados}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <FuncionarioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={funcionarioSelecionado}
      />
    </>
  );
};

export default Funcionarios;
