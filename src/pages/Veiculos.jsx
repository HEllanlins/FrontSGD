import { useState } from "react";
import Nav from "../components/Navbar";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";
import { useVeiculo } from "../hooks/useVeiculo";
import { Modal } from "../components/Modal";

export default function Veiculos() {
  const { veiculos, createVeiculo, editVeiculo, deleteVeiculo } = useVeiculo();

  const [isModalOpen, setModalOpen] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

  const handleAdd = () => {
    setVeiculoSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (veiculo) => {
    setVeiculoSelecionado(veiculo);
    setModalOpen(true);
  };

  const handleSave = async (veiculoEditado) => {
    if (veiculoSelecionado && veiculoEditado.id) {
      // Edição
      try {
        await editVeiculo(veiculoEditado.id, veiculoEditado);
        toast.success("Veiculo editado com sucesso");
      } catch (error) {
        toast.error("Erro ao editar o veiculo");
        console.error(error);
      }
    } else {
      // Novo veiculo
      try {
        await createVeiculo(veiculoEditado);
        toast.success("Veiculo criado com sucesso");
      } catch (error) {
        toast.error("Error ao adicionar veículo");
        console.error(error);
      }
    }
  };
  const handleDelete = async (veiculo) => {
    if (window.confirm(`Tem certeza que deseja excluir o veículo ${veiculo.modelo}?`)) {
      try {
        await deleteVeiculo(veiculo.id);
        toast.success("Veículo excluído com sucesso");
      } catch (error) {
        toast.error("Erro ao deletar o veiculo");
        console.error(error);
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="h-full w-full px-10 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            onClick={handleAdd}>
            ➕ Adicionar Veículo
          </button>
        </div>
        <Table
          title="Veículos"
          headers={[
            { label: "Ano", key: "ano" },
            { label: "Marca", key: "marca" },
            { label: "Modelo", key: "modelo" },
            { label: "Placa", key: "placa" },
          ]}
          data={veiculos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        title={veiculoSelecionado ? "Editar Veiculo" : "Adicionar Veiculo"}
        fields={[
          { key: "modelo", label: "Modelo (Ex: Toro)" },
          { key: "marca", label: "Marca (Ex: Fiat)" },
          { key: "ano", label: "Ano" },
          { key: "placa", label: "Placa" },
        ]}
        selected={veiculoSelecionado}
        onSave={async (data) => {
          await handleSave(data);
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
}
