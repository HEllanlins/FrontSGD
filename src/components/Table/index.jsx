import PropTypes from "prop-types";

function DynamicTable({ headers, data }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-500">
          {/* Método map para criar um <th> para cada campo do header que for enviado na chamada do componente */}
          {headers.map((header) => (
            <th key={header} className="border p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Método map para desestruturar o data criando uma linha e um objeto row["header"] para cada campo */}
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="odd:bg-white even:bg-gray-100">
            {/* Método map para inserir os valores de cada linha, atribuindo cada campo ao seu respectivo header através da key */}
            {headers.map((header) => (
              <td key={header} className="border p-2">
                {row[header] ?? "-"}
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
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DynamicTable;
