import Nav from "../components/Navbar";
import Table from "../components/Table";
import useChamados from "../hooks/useChamados";
import SearchBar from "../components/SearchBar";

export default function Chamados() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  const chamado = useChamadoStore((state) => state.chamado);
  const setChamados = useChamadoStore((state) => state.setChamados);
  const addChamados = useChamadoStore((state) => state.addChamados);
  const updateChamados = useChamadoStore((state) => state.updateChamados);
  const removeChamados = useChamadoStore((state) => state.removeChamados);

  useEffect(() => {
    async function getData() {
      const resposta = await api.get("/chamado");
      const chamadosComId = resposta.data.map((v) => ({
        ...v,
        id: v.id_chamado,
      }));
      setChamados(chamadosComId);
    }
    getData();
  }, [setChamados]);

  const handleAdd = () => {
    setChamadoSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalOpen(true);
  };

  const handleSave = async (chamadoData) => {
    if (chamadoData.id) {
      // Edit
      await api.put(`/chamado/${chamadoData.id}`, chamadoData);
      updateChamados(chamadoData.id, chamadoData);
    } else {
      // Add
      const resposta = await api.post("/veiculo", chamadoData);
      addChamado({ ...chamadoData, id: resposta.data.id_chamado });
    }
    setModalOpen(false);
  };
  const handleDelete = async (veiculo) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o chamado ${chamado.modelo}?`
      )
    ) {
      try {
        await api.delete(`/chamado/${chamado.id}`);
        removeChamado(chamado.id);
      } catch (e) {
        toast.error("Erro ao deletar o chamado");
        console.error(e);
      }
    }
  };

  if (loading) return <p className="p-4">Carregando chamados...</p>;

  return (
    <>
      <Nav />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Gerenciamento de Chamados</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            onClick={handleAdd}
          >
            ➕ Adicionar Veículo
          </button>
        </div>
        <Table headers={headers} data={chamados} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {chamadoSelecionado ? "Editar Chamado" : "Adicionar Chamado"}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSave(chamadoSelecionado);
              }}
            >
              <input
                className="mb-2 border p-2 w-full"
                value={chamadoSelecionado?.modelo || ""}
                onChange={(e) =>
                  setChamadoSelecionado({
                    ...chamadoSelecionado,
                    modelo: e.target.value,
                  })
                }
                placeholder="Modelo"
                required
              />
              <input
                className="mb-2 border p-2 w-full"
                value={chamadoSelecionado?.ano || ""}
                onChange={(e) =>
                  setChamadoSelecionado({
                    ...chamadoSelecionado,
                    ano: e.target.value,
                  })
                }
                placeholder="Ano"
                required
              />
              <input
                className="mb-2 border p-2 w-full"
                value={chamadoSelecionado?.marca || ""}
                onChange={(e) =>
                  setChamadoSelecionado({
                    ...chamadoSelecionado,
                    marca: e.target.value,
                  })
                }
                placeholder="Marca"
                required
              />
              <input
                className="mb-2 border p-2 w-full"
                value={chamadoSelecionado?.placa || ""}
                onChange={(e) =>
                  setChamadoSelecionado({
                    ...chamadoSelecionado,
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
