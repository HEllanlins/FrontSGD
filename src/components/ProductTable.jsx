import StatusBadge from './StatusBadge';
import ProductActions from './ProductActions';

const produtos = [
  {
    nome: 'Notebook Dell Inspiron',
    categoria: 'Eletrônicos',
    quantidade: 15,
    preco: 'R$ 3.500,00',
    status: 'Disponível',
    data: '14/10/2023',
  },
  {
    nome: 'Monitor LG 24 polegadas',
    categoria: 'Eletrônicos',
    quantidade: 8,
    preco: 'R$ 950,00',
    status: 'Disponível',
    data: '11/10/2023',
  },
  {
    nome: 'Teclado Mecânico Redragon',
    categoria: 'Periféricos',
    quantidade: 3,
    preco: 'R$ 250,00',
    status: 'Baixo',
    data: '09/10/2023',
  },
  {
    nome: 'Mouse Logitech G502',
    categoria: 'Periféricos',
    quantidade: 0,
    preco: 'R$ 320,00',
    status: 'Esgotado',
    data: '04/10/2023',
  },
  {
    nome: 'Cadeira Gamer ThunderX3',
    categoria: 'Móveis',
    quantidade: 5,
    preco: 'R$ 1.200,00',
    status: 'Disponível',
    data: '07/10/2023',
  },
];

const ProductTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="text-left px-4 py-2">Produto</th>
            <th className="text-left px-4 py-2">Categoria</th>
            <th className="text-left px-4 py-2">Quantidade</th>
            <th className="text-left px-4 py-2">Preço Unit.</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-left px-4 py-2">Última Atualização</th>
            <th className="text-left px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{p.nome}</td>
              <td className="px-4 py-2">{p.categoria}</td>
              <td className="px-4 py-2">{p.quantidade}</td>
              <td className="px-4 py-2">{p.preco}</td>
              <td className="px-4 py-2"><StatusBadge status={p.status} /></td>
              <td className="px-4 py-2">{p.data}</td>
              <td className="px-4 py-2"><ProductActions /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;