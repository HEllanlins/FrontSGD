import React, { useEffect, useState } from 'react';
import Nav from '../components/Navbar';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import { toast } from 'react-toastify';

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'aberto':
        return 'bg-blue-100 text-blue-800';
      case 'em andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'concluído':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
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

export default function Chamados() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState(""); // ✅ Estado para busca

  useEffect(() => {
    document.title = "SGD - Chamados";
  }, []);

  useEffect(() => {
    const dadosExemplo = [
      {
        id: 1,
        cliente_nome: "João Silva",
        categoria_nome: "Dedetização",
        descricao: "Dedetização residencial",
        metragem: 120,
        valor: 250.00,
        status: "Aberto",
        data_criacao: "2025-01-15"
      },
      {
        id: 2,
        cliente_nome: "Maria Santos",
        categoria_nome: "Desratização",
        descricao: "Controle de pragas comercial",
        metragem: 300,
        valor: 450.00,
        status: "Em Andamento",
        data_criacao: "2025-01-10"
      }
    ];
    setChamados(dadosExemplo);
  }, []);

  // ✅ Filtro de dados
  const chamadosFiltrados = chamados.filter(
    (chamado) =>
      chamado.cliente_nome.toLowerCase().includes(busca.toLowerCase()) ||
      chamado.categoria_nome.toLowerCase().includes(busca.toLowerCase()) ||
      chamado.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      chamado.status.toLowerCase().includes(busca.toLowerCase())
  );

  const handleEdit = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalOpen(true);
  };

  const handleDelete = async (chamado) => {
    if (window.confirm(`Deseja excluir o chamado de ${chamado.cliente_nome}?`)) {
      try {
        setChamados(prev => prev.filter(c => c.id !== chamado.id));
        toast.success('Chamado excluído com sucesso');
      } catch (error) {
        console.error('Erro ao excluir chamado:', error);
        toast.error('Erro ao excluir chamado');
      }
    }
  };

  const handleAdd = () => {
    setChamadoSelecionado(null);
    setModalOpen(true);
  };

  const handleSave = async (chamadoData) => {
    try {
      if (chamadoSelecionado && chamadoSelecionado.id) {
        setChamados(prev => prev.map(c => 
          c.id === chamadoSelecionado.id ? { ...c, ...chamadoData } : c
        ));
        toast.success('Chamado editado com sucesso');
      } else {
        const novoChamado = {
          ...chamadoData,
          id: Date.now(),
          status: 'Aberto',
          data_criacao: new Date().toISOString().split('T')[0]
        };
        setChamados(prev => [...prev, novoChamado]);
        toast.success('Chamado criado com sucesso');
      }
      setModalOpen(false);
      setChamadoSelecionado(null);
    } catch (error) {
      console.error('Erro ao salvar chamado:', error);
      toast.error('Erro ao salvar chamado');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setChamadoSelecionado(null);
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Carregando chamados...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          Gerenciamento de Chamados
        </h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          {/* ✅ Passando value e onChange para SearchBar */}
          <SearchBar value={busca} onChange={setBusca} />
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleAdd}
          >
            ➕ Adicionar Chamado
          </button>
        </div>

        <Table
          title="Chamados de Serviço"
          headers={[
            { label: 'Cliente', key: 'cliente_nome' },
            { label: 'Categoria', key: 'categoria_nome' },
            { label: 'Descrição', key: 'descricao' },
            { label: 'Metragem (m²)', key: 'metragem' },
            { label: 'Valor (R$)', key: 'valor', render: (row) => `R$ ${row.valor?.toFixed(2)}` },
            { 
              label: 'Status', 
              key: 'status',
              render: (row) => <StatusBadge status={row.status} />
            },
            { label: 'Data', key: 'data_criacao' }
          ]}
          data={chamadosFiltrados} // ✅ Usando dados filtrados
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal permanece igual */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {chamadoSelecionado ? "Editar Chamado" : "Adicionar Chamado"}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                  cliente_nome: formData.get('cliente_nome'),
                  categoria_nome: formData.get('categoria_nome'),
                  descricao: formData.get('descricao'),
                  metragem: parseFloat(formData.get('metragem')),
                  valor: parseFloat(formData.get('valor'))
                };
                await handleSave(data);
              }}
            >
              <input
                name="cliente_nome"
                className="mb-2 border p-2 w-full rounded"
                defaultValue={chamadoSelecionado?.cliente_nome || ""}
                placeholder="Nome do Cliente"
                required
              />
              <input
                name="categoria_nome"
                className="mb-2 border p-2 w-full rounded"
                defaultValue={chamadoSelecionado?.categoria_nome || ""}
                placeholder="Categoria do Serviço"
                required
              />
              <textarea
                name="descricao"
                className="mb-2 border p-2 w-full rounded"
                defaultValue={chamadoSelecionado?.descricao || ""}
                placeholder="Descrição do serviço"
                rows="3"
                required
              />
              <input
                name="metragem"
                type="number"
                step="0.01"
                className="mb-2 border p-2 w-full rounded"
                defaultValue={chamadoSelecionado?.metragem || ""}
                placeholder="Metragem (m²)"
                required
              />
              <input
                name="valor"
                type="number"
                step="0.01"
                className="mb-2 border p-2 w-full rounded"
                defaultValue={chamadoSelecionado?.valor || ""}
                placeholder="Valor (R$)"
                required
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}