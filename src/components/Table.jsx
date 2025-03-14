import PropTypes from "prop-types";

function DynamicTable({ headers, data }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-500">
          {headers.map(({ label }) => (
            <th key={label} className="border p-2 text-center">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="odd:bg-white even:bg-gray-100">
            {headers.map(({ key }) => (
              <td key={key} className="border p-2 text-center">
                {row[key] ?? "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/*Exemplo de uso

  // Passar todos os campos da tabela
  const headers = ["Cliente", "Categoria", "Observação", "Metragem", "Valor", "Status"];

  // Passar o data com as mesmas chaves que estão no header
  const data = [
    {
      Cliente: "Arthur",
      Categoria: "Dedetização",
      Observação: "Chegar cedo",
      Metragem: 80,
      Valor: 500,
      Status: "Pendente",
    },
    {
      Cliente: "Arthur",
      Categoria: "Dedetização",
      Observação: "Chegar cedo",
      Metragem: 80,
      Valor: 500,
      Status: "Pendente",
    },
  ];

  Chamada do componente
  <Table headers={headers} data={data} />
*/

// Definição do tipos das propriedades do componente (Frescura do react)
DynamicTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DynamicTable;
