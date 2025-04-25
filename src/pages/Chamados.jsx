import { useEffect, useState } from "react";
import api from "../services/axios";
import Nav from "../components/Navbar";
import Table from "../components/Table";

export default function Chamados() {
  //<> é o sinal chamado fragmento, serve para criar um suposto elemento pai sem nada dentro para não ocupar nenhum espaço

  //Trocar data pela requisição pra API(ler docs do axios), e colocar em cada pagina que for usar a tabela seus respectivos headers no caso headers do chamados ja está correto

  const [data, setData] = useState([]);

  const headers = [
    { label: "Cliente", key: "cliente_nome" },
    { label: "Categoria", key: "categoria_nome" },
    { label: "Observação", key: "descricao" },
    { label: "Metragem(m²)", key: "Metragem" },
    { label: "Valor(R$)", key: "valor" },
    { label: "Status", key: "status" },
  ];

  useEffect(() => {
    async function getData() {
      const resposta = await api.get("/servico");
      setData(resposta.data);
    }
    getData();
  }, []);

  // Passar o data com as mesmas chaves que estão no header

  return (
    <>
      <Nav />
      <h1>Chamados</h1>
      <Table headers={headers} data={data} />
    </>
  );
}
