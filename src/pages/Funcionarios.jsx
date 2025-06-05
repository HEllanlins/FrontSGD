import { useState } from 'react';
import { useFuncionario } from '../hooks/useFuncionario';
import Nav from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import FuncionarioModal from '../components/FuncionarioModal';
import { toast } from 'react-toastify';

const Funcionarios = () => {
  const { funcionarios, loading, createFuncionario, editFuncionario, deleteFuncionario } = useFuncionario();

  const [isModalOpen, setModalOpen] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  const handleEdit = funcionario => {
    setFuncionarioSelecionado(funcionario);
    setModalOpen(true);
  };

  const handleDelete = async funcionario => {
    if (window.confirm(`Deseja excluir ${funcionario.nome}?`)) {
      try {
        await deleteFuncionario(funcionario.id);
        toast.success('Funcionário excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir funcionário');
      }
    }
  };

  const handleAdd = () => {
    setFuncionarioSelecionado(null);
    setModalOpen(true);
  };

  const handleSave = async funcionarioEditado => {
    try {
      if (funcionarioSelecionado && funcionarioEditado.id) {
        await editFuncionario(funcionarioEditado.id, funcionarioEditado);
      } else {
        await createFuncionario(funcionarioEditado);
      }
    } catch (error) {
      toast.error('Erro ao salvar funcionário');
    }
  };

  if (loading) return <div>Carregando funcionários...</div>;

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Gerenciamento de Funcionários</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAdd}>
            ➕ Adicionar Funcionário
          </button>
        </div>

        <Table
          title="Funcionários Cadastrados"
          headers={[
            { label: 'Nome', key: 'nome' },
            { label: 'Cargo', key: 'cargo' },
            { label: 'E-mail', key: 'email' },
            { label: 'Data de Admissão', key: 'data_admissao' },
            {
              label: 'Status',
              key: 'status',
              render: row => <StatusBadge status={row.status} />
            }
          ]}
          data={funcionarios}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <FuncionarioModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={funcionarioSelecionado}
      />
    </>
  );
};

export default Funcionarios;
