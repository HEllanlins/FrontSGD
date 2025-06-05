import React, { useState, useEffect } from 'react';
import Nav from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import ClienteModal from '../components/ClienteModal';
import { toast } from 'react-toastify';

// Componente para o badge de status
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'inativo':
        return 'bg-red-100 text-red-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    document.title = "SGD - Clientes";

    // Dados mockados
    setClientes([
      {
        id: 1,
        nome: "Alice Martins",
        email: "alice.martins@example.com",
        telefone: "(11) 98765-4321",
        data_cadastro: "2022-02-15",
        status: "ativo"
      },
      {
        id: 2,
        nome: "Carlos Henrique",
        email: "carlos.henrique@example.com",
        telefone: "(21) 99876-5432",
        data_cadastro: "2023-05-20",
        status: "pendente"
      },
      {
        id: 3,
        nome: "Fernanda Silva",
        email: "fernanda.silva@example.com",
        telefone: "(31) 91234-5678",
        data_cadastro: "2024-01-10",
        status: "inativo"
      }
    ]);
  }, []);

  const handleEdit = (cliente) => {
    setClienteSelecionado(cliente);
    setModalOpen(true);
  };

  const handleDelete = (cliente) => {
    if (window.confirm(`Deseja excluir ${cliente.nome}?`)) {
      setClientes((prev) => prev.filter((c) => c.id !== cliente.id));
      toast.success('Cliente excluído com sucesso');
    }
  };

  const handleAdd = () => {
    setClienteSelecionado(null);
    setModalOpen(true);
  };

  const handleSave = (clienteEditado) => {
    if (clienteSelecionado?.id) {
      setClientes((prev) =>
        prev.map((c) => (c.id === clienteSelecionado.id ? { ...c, ...clienteEditado } : c))
      );
      toast.success('Cliente editado com sucesso');
    } else {
      const novoCliente = {
        id: Date.now(),
        ...clienteEditado,
        data_cadastro: new Date().toISOString().split('T')[0],
      };
      setClientes((prev) => [...prev, novoCliente]);
      toast.success('Cliente criado com sucesso');
    }
    setModalOpen(false);
    setClienteSelecionado(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setClienteSelecionado(null);
  };

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase()) ||
      c.telefone.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          Gerenciamento de Clientes
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar value={busca} onChange={setBusca} />
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleAdd}
          >
            ➕ Adicionar Cliente
          </button>
        </div>

        <Table
          title="Clientes Cadastrados"
          headers={[
            { label: 'Nome', key: 'nome' },
            { label: 'E-mail', key: 'email' },
            { label: 'Telefone', key: 'telefone' },
            { label: 'Data de Cadastro', key: 'data_cadastro' },
            {
              label: 'Status',
              key: 'status',
              render: (row) => <StatusBadge status={row.status} />
            }
          ]}
          data={clientesFiltrados}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ClienteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={clienteSelecionado}
      />
    </>
  );
};

export default Clientes;
