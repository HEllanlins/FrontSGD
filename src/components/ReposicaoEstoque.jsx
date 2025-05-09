import { useNavigate } from 'react-router-dom';
import { useProduto } from '../hooks/useProduto';

export default function ReposicaoEstoque() {
  const navigate = useNavigate();
  const { produtos, loading } = useProduto();

  // Considera produtos com quantidade <= 5 como "em baixa"
  const produtosEmBaixa = produtos ? produtos.filter(p => Number(p.qtd_estoque) <= 5) : [];

  function handleClick() {
    navigate('/estoque');
  }

  if (loading) return <div>Carregando produtos...</div>;

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
            {produtosEmBaixa.length === 0 ? (
              <tr>
                <td className="p-2" colSpan={2}>
                  Nenhum produto em baixa.
                </td>
              </tr>
            ) : (
              produtosEmBaixa.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-red-50 cursor-pointer" onClick={handleClick}>
                  <td className="p-2">{item.nome}</td>
                  <td className="p-2 text-red-600 font-bold">{item.qtd_estoque}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
