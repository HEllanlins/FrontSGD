<<<<<<< HEAD
import { useState } from 'react';
import { useCliente } from '../hooks/useCliente';
import Nav from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import ClienteModal from '../components/ClienteModal'; // componente modal para cliente
import { toast } from 'react-toastify';

const Clientes = () => {
  const { clientes, loading, createCliente, editCliente, deleteCliente } = useCliente();

  const [isModalOpen, setModalOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const handleEdit = cliente => {
    setClienteSelecionado(cliente);
    setModalOpen(true);
  };

  const handleDelete = async cliente => {
    if (window.confirm(`Deseja excluir ${cliente.nome}?`)) {
      try {
        await deleteCliente(cliente.id);
        toast.success('Cliente excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir cliente');
      }
    }
  };
=======
import { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import ClienteTable from "../components/ClienteTable";

const Clientes = () => {
  useEffect(() => {
    document.title = "SGD - Clientes";
  });

  const [clientes, setClientes] = useState([
    { nome: "João Silva", email: "joao@exemplo.com", telefone: "(11) 98765-4321", empresa: "Empresa A" },
    { nome: "Maria Oliveira", email: "maria@exemplo.com", telefone: "(21) 91234-5678", empresa: "Empresa B" },
    { nome: "Carlos Santos", email: "carlos@exemplo.com", telefone: "(31) 99876-5432", empresa: "Empresa C" },
  ]);
>>>>>>> f95ab878a03bc99cdd34ee7ef57a675e55a1a72d

  const handleAdd = () => {
    setClienteSelecionado(null);
    setModalOpen(true);
  };

  const handleSave = async clienteEditado => {
    try {
      if (clienteSelecionado && clienteEditado.id) {
        await editCliente(clienteEditado.id, clienteEditado);
      } else {
        await createCliente(clienteEditado);
      }
    } catch (error) {
      toast.error('Erro ao salvar cliente');
    }
  };

<<<<<<< HEAD
  if (loading) return <div>Carregando clientes...</div>;
=======
  const handleEdit = (cliente) => {
    const nome = prompt("Novo nome:", cliente.nome);
    const email = prompt("Novo email:", cliente.email);
    const telefone = prompt("Novo telefone:", cliente.telefone);
    const empresa = prompt("Nova empresa:", cliente.empresa);
    if (nome && email && telefone && empresa) {
      const atualizados = clientes.map((c) => (c === cliente ? { nome, email, telefone, empresa } : c));
      setClientes(atualizados);
    }
  };

  const handleDelete = (cliente) => {
    const confirm = window.confirm(`Deseja excluir ${cliente.nome}?`);
    if (confirm) {
      setClientes(clientes.filter((c) => c !== cliente));
    }
  };
>>>>>>> f95ab878a03bc99cdd34ee7ef57a675e55a1a72d

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
<<<<<<< HEAD
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Gerenciamento de Clientes</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAdd}>
=======
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Gerenciamento de Clientes</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-800" onClick={handleAdd}>
>>>>>>> f95ab878a03bc99cdd34ee7ef57a675e55a1a72d
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
              render: row => <StatusBadge status={row.status} />
            }
          ]}
          data={clientes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
<<<<<<< HEAD

      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={clienteSelecionado}
      />
=======
>>>>>>> f95ab878a03bc99cdd34ee7ef57a675e55a1a72d
    </>
  );
};

export default Clientes;
