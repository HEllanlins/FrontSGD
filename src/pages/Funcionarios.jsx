import { useState } from "react";
import Nav from "../components/Navbar";
import { Pencil, Trash2 } from "lucide-react";

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([
    {
      nome: "João Silva",
      cargo: "Dedetizador",
      departamento: "Operacional",
      salario: 2500,
      status: "Ativo",
      admissao: "15/03/2023",
    },
    {
      nome: "Maria Souza",
      cargo: "Administrativo",
      departamento: "RH",
      salario: 3200,
      status: "Ativo",
      admissao: "10/01/2022",
    },
  ]);

  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: "",
    cargo: "",
    departamento: "",
    salario: 0,
  });

  const [editandoIndex, setEditandoIndex] = useState(null); // <- para controlar a edição

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoFuncionario({ ...novoFuncionario, [name]: value });
  };

  const adicionarOuSalvar = () => {
    if (editandoIndex !== null) {
      // Atualizando funcionário existente
      const atualizados = [...funcionarios];
      atualizados[editandoIndex] = {
        ...atualizados[editandoIndex],
        ...novoFuncionario,
      };
      setFuncionarios(atualizados);
      setEditandoIndex(null);
    } else {
      // Adicionando novo funcionário
      const dataAtual = new Date().toLocaleDateString("pt-BR");
      const novo = {
        ...novoFuncionario,
        status: "Ativo",
        admissao: dataAtual,
      };
      setFuncionarios([...funcionarios, novo]);
    }

    // Limpa formulário
    setNovoFuncionario({
      nome: "",
      cargo: "",
      departamento: "",
      salario: 0,
    });
  };

  const editarFuncionario = (index) => {
    const funcionario = funcionarios[index];
    setNovoFuncionario({
      nome: funcionario.nome,
      cargo: funcionario.cargo,
      departamento: funcionario.departamento,
      salario: funcionario.salario,
    });
    setEditandoIndex(index);
  };

  const removerFuncionario = (index) => {
    const confirmacao = window.confirm("Tem certeza que deseja remover este funcionário?");
    if (confirmacao) {
      const novaLista = funcionarios.filter((_, i) => i !== index);
      setFuncionarios(novaLista);
    }
  };

  return (
    <>
      <Nav />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">
            {editandoIndex !== null ? "Editar Funcionário" : "Adicionar Funcionário"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="nome"
                value={novoFuncionario.nome}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cargo</label>
              <input
                type="text"
                name="cargo"
                value={novoFuncionario.cargo}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Departamento</label>
              <input
                type="text"
                name="departamento"
                value={novoFuncionario.departamento}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salário (R$)</label>
              <input
                type="number"
                name="salario"
                value={novoFuncionario.salario}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button onClick={adicionarOuSalvar} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {editandoIndex !== null ? "Salvar Alterações" : "Adicionar"}
            </button>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-gray-100 rounded-lg p-4 border border-blue-300">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Lista de Funcionários</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-blue-400 rounded-md overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">Cargo</th>
                  <th className="px-4 py-2">Departamento</th>
                  <th className="px-4 py-2">Salário</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Admissão</th>
                  <th className="px-4 py-2 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {funcionarios.map((f, index) => (
                  <tr key={index} className="border-b border-blue-200 hover:bg-blue-50">
                    <td className="px-4 py-2">{f.nome}</td>
                    <td className="px-4 py-2">{f.cargo}</td>
                    <td className="px-4 py-2">{f.departamento}</td>
                    <td className="px-4 py-2">R$ {parseFloat(f.salario).toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        {f.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{f.admissao}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => editarFuncionario(index)}
                        className="bg-gray-100 p-2 rounded hover:bg-blue-100">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => removerFuncionario(index)}
                        className="bg-gray-100 p-2 rounded hover:bg-red-100">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funcionarios;
