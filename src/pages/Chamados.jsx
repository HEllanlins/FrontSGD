import Nav from "../components/Navbar";
import Table from "../components/Table";

export default function Chamados() {
  //<> é o sinal chamado fragmento, serve para criar um suposto elemento pai sem nada dentro para não ocupar nenhum espaço

  //Trocar data pela requisição pra API(ler docs do axios), e colocar em cada pagina que for usar a tabela seus respectivos headers no caso headers do chamados ja está correto

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

  return (
    <>
      <Nav />
      <h1>Chamados</h1>
      <Table headers={headers} data={data} />
    </>
  );
}
