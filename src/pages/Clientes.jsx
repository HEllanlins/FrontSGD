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

  if (loading) return <div>Carregando clientes...</div>;

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Gerenciamento de Clientes</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAdd}>
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

      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={clienteSelecionado}
      />
    </>
  );
};

export default Clientes;
