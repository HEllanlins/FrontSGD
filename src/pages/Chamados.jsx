import { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import Table from "../components/Table";
import { useService } from "../hooks/useService";
import { toast } from "react-toastify";
import { Modal } from "../components/Modal";
import SearchBar from "../components/SearchBar";

export default function Chamados() {
  const { services, loading, createService, editService, deleteService } = useService();

  const [isModalOpen, setModalOpen] = useState(false);
  const [serviceSelecionada, setServiceSelecionada] = useState(null);

  const handleEdit = (service) => {
    setServiceSelecionada(service);
    setModalOpen(true);
  };

  const handleDelete = async (service) => {
    if (window.confirm(`Deseja excluir ${service.nome}?`)) {
      try {
        await deleteService(service.id);
        toast.success("Serviço excluído com sucesso");
      } catch (error) {
        toast.error("Erro ao excluir o serviço");
        console.error(error);
      }
    }
  };

  const handleAdd = () => {
    setServiceSelecionada(null);
    setModalOpen(true);
  };

  const handleSave = async (serviceEditada) => {
    if (serviceSelecionada && serviceEditada.id) {
      // Edição
      try {
        await editService(serviceEditada.id, serviceEditada);
      } catch (error) {
        toast.error("Erro ao editar o serviço");
        console.error(error);
      }
    } else {
      // Novo serviço
      try {
        await createService(serviceEditada);
      } catch (error) {
        toast.error("Erro ao adicionar serviço");
        console.error(error);
      }
    }
  };

  if (loading) return <div>Carregando serviços...</div>;

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
          headers={[
            { label: "Cliente", key: "cliente_nome" },
            { label: "Categoria", key: "categoria_nome" },
            { label: "Observação", key: "descricao" },
            { label: "Metragem(m²)", key: "Metragem" },
            { label: "Valor(R$)", key: "valor" },
            { label: "Status", key: "status" },
          ]}
          data={services}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        title={serviceSelecionada ? "Editar Serviço" : "Adicionar Serviço"}
        fields={[
          { key: "cliente_nome", label: "Cliente" }, // Trocar Futuramente por um select
          { key: "categoria_nome", label: "Categoria" }, // Trocar futuramente por um select
          { key: "descricao", label: "Observação" },
          { key: "Metragem", label: "Metragem(m²)", type: "number" },
          { key: "valor", label: "Valor(R$)", type: "number" },
        ]}
        selected={serviceSelecionada}
        onSave={async (data) => {
          await handleSave(data);
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
}
