import { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import Table from "../components/Table";
import api from "../services/axios";
import useVeiculoStore from "../stores/useVeiculoStore";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";

export default function Veiculos() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

  const veiculos = useVeiculoStore((state) => state.veiculos);
  const setVeiculos = useVeiculoStore((state) => state.setVeiculos);
  const addVeiculo = useVeiculoStore((state) => state.addVeiculo);
  const updateVeiculo = useVeiculoStore((state) => state.updateVeiculo);
  const removeVeiculo = useVeiculoStore((state) => state.removeVeiculo);

  const headers = [
    { label: "Ano", key: "ano" },
    { label: "Marca", key: "marca" },
    { label: "Modelo", key: "modelo" },
    { label: "Placa", key: "placa" },
  ];

  useEffect(() => {
    async function getData() {
      const resposta = await api.get("/veiculo");
      const veiculosComId = resposta.data.map((v) => ({
        ...v,
        id: v.id_veiculo,
      }));
      setVeiculos(veiculosComId);
    }
    getData();
  }, [setVeiculos]);

  const handleAdd = () => {
    setVeiculoSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (veiculo) => {
    setVeiculoSelecionado(veiculo);
    setModalOpen(true);
  };

  const handleSave = async (veiculoData) => {
    if (veiculoData.id) {
      // Edit
      await api.put(`/veiculo/${veiculoData.id}`, veiculoData);
      updateVeiculo(veiculoData.id, veiculoData);
    } else {
      // Add
      const resposta = await api.post("/veiculo", veiculoData);
      addVeiculo({ ...veiculoData, id: resposta.data.id_veiculo });
    }
    setModalOpen(false);
  };
  const handleDelete = async (veiculo) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o veículo ${veiculo.modelo}?`
      )
    ) {
      try {
        await api.delete(`/veiculo/${veiculo.id}`);
        removeVeiculo(veiculo.id);
      } catch (e) {
        toast.error("Erro ao deletar o veiculo");
        console.error(e);
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
            onClick={handleAdd}
          >
            ➕ Adicionar Veículo
          </button>
        </div>
        <Table
          title="Veículos"
          headers={headers}
          data={veiculos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {veiculoSelecionado ? "Editar Veículo" : "Adicionar Veículo"}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSave(veiculoSelecionado);
              }}
            >
              <input
                className="mb-2 border p-2 w-full"
                value={veiculoSelecionado?.modelo || ""}
                onChange={(e) =>
                  setVeiculoSelecionado({
                    ...veiculoSelecionado,
                    modelo: e.target.value,
                  })
                }
                placeholder="Modelo"
                required
              />
              <input
                className="mb-2 border p-2 w-full"
                value={veiculoSelecionado?.ano || ""}
                onChange={(e) =>
                  setVeiculoSelecionado({
                    ...veiculoSelecionado,
                    ano: e.target.value,
                  })
                }
                placeholder="Ano"
                required
              />
              <input
                className="mb-2 border p-2 w-full"
                value={veiculoSelecionado?.marca || ""}
                onChange={(e) =>
                  setVeiculoSelecionado({
                    ...veiculoSelecionado,
                    marca: e.target.value,
                  })
                }
                placeholder="Marca"
                required
              />
              <input
                className="mb-2 border p-2 w-full"
                value={veiculoSelecionado?.placa || ""}
                onChange={(e) =>
                  setVeiculoSelecionado({
                    ...veiculoSelecionado,
                    placa: e.target.value,
                  })
                }
                placeholder="Placa"
                required
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
                  onClick={() => setModalOpen(false)}
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
