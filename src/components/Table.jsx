import PropTypes from "prop-types";

/**
 * @param {Array<{label: string, key: string, render?: (row: any) => React.ReactNode}>} headers
 * @param {Array<Object>} data
 * @param {(row: Object) => void} onEdit
 * @param {(row: Object) => void} onDelete
 * @param {string} [title] - Optional table title
 */
const Table = ({ headers, data, onEdit, onDelete, title }) => {
  // Garantir que "data" é um array
  const safeData = Array.isArray(data) ? data : [];

  if (!Array.isArray(data)) {
    console.warn(
      "[Table] 'data' não é um array. Verifique o valor recebido:",
      data
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      {title && (
        <h2 className="text-xl font-semibold text-blue-800 mb-4">{title}</h2>
      )}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-center border border-blue-500 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              {headers.map((header) => (
                <th key={header.key} className="px-4 py-3">
                  {header.label}
                </th>
              ))}
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {safeData.length > 0 ? (
              safeData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className="border-t border-blue-200 hover:bg-blue-50 transition duration-200"
                >
                  {headers.map((header) => (
                    <td key={header.key} className="px-4 py-3">
                      {header.render ? header.render(row) : row[header.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 hover:text-red-800 transition cursor-pointer"
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  Nenhum dado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Table;
