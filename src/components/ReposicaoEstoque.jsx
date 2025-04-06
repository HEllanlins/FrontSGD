import { useNavigate } from "react-router-dom";

export default function ReposicaoEstoque() {
  const navigate = useNavigate();

  const produtosEmBaixa = [
    { nome: "Straik gel", quantidade: 3 },
    { nome: "K-Othrine", quantidade: 1 },
    { nome: "Luva 3/4", quantidade: 2 },
  ];

  function handleClick() {
    navigate("/estoque");
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Reposição de Estoque</h2>
      <div className="overflow-auto max-h-64">
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-2">Produto</th>
              <th className="p-2">Qtd.</th>
            </tr>
          </thead>
          <tbody>
            {produtosEmBaixa.map((item, idx) => (
              <tr key={idx} className="hover:bg-red-50 cursor-pointer" onClick={handleClick}>
                <td className="p-2">{item.nome}</td>
                <td className="p-2 text-red-600 font-bold">{item.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
