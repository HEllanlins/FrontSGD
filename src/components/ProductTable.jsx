import React from "react";
import StatusBadge from "./StatusBadge";
import ProductActions from "./ProductActions";

const ProductTable = ({ produtos, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Produtos em Estoque</h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-center border border-blue-500">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Quantidade</th>
              <th className="px-4 py-3">Preço Unit.</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Última Atualização</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {produtos.map((produto, idx) => (
              <tr
                key={idx}
                className="border-t border-blue-200 hover:bg-blue-50 transition duration-200"
              >
                <td className="px-4 py-3">{produto.nome}</td>
                <td className="px-4 py-3">{produto.categoria}</td>
                <td className="px-4 py-3">{produto.quantidade}</td>
                <td className="px-4 py-3">{produto.preco}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={produto.status} />
                </td>
                <td className="px-4 py-3">{produto.data}</td>
                <td className="px-4 py-3">
                  <ProductActions
                    onEdit={() => onEdit(produto)}
                    onDelete={() => onDelete(produto)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
