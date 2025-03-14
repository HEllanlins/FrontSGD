import Nav from "../components/Navbar";
import Table from "../components/Table";
import api from "../services/axios";

export default function Clientes() {
  //<> é o sinal chamado fragmento, serve para criar um suposto elemento pai sem nada dentro para não ocupar nenhum espaço

  //Trocar data pela requisição pra API(ler docs do axios), e colocar em cada pagina que for usar a tabela seus respectivos headers no caso headers do chamados ja está correto

  const headers = ["cpf_cnpj", "nome", "telefone", "endereco", "email"];

  // Passar o data com as mesmas chaves que estão no header
  const data = api.get("/cliente")

  return (
    <>
      <Nav />
      <h1>Clientes</h1>
      <Table headers={headers} data={data} />
    </>
  );
}
