const ClienteTable = ({ clientes, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md mt-4">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-3">Nome</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Telefone</th>
            <th className="px-4 py-3">Empresa</th>
            <th className="px-4 py-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {clientes.map((cliente, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{cliente.nome}</td>
              <td className="px-4 py-2">{cliente.email}</td>
              <td className="px-4 py-2">{cliente.telefone}</td>
              <td className="px-4 py-2">{cliente.empresa}</td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <button className="text-blue-600 hover:text-blue-800" onClick={() => onEdit(cliente)}>
                  ✏️
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(cliente)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteTable;
