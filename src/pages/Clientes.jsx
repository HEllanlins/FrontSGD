import { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import Table from "../components/Table";
import api from "../services/axios";

export default function Clientes() {
  //<> é o sinal chamado fragmento, serve para criar um suposto elemento pai sem nada dentro para não ocupar nenhum espaço

  //Trocar data pela requisição pra API(ler docs do axios), e colocar em cada pagina que for usar a tabela seus respectivos headers no caso headers do chamados ja está correto

  const [data, setData] = useState([]);

  const headers = [
    { label: "CPF", key: "cpf_cnpj" },
    { label: "Nome", key: "nome" },
    { label: "Telefone", key: "telefone" },
    { label: "Endereço", key: "endereco" },
    { label: "Email", key: "email" },
  ];

  useEffect(() => {
    async function getData() {
      const resposta = await api.get("/cliente");
      setData(resposta.data);
    }
    console.log(getData());
  }, []);
  return (
    <>
      <Nav />
      <div className="p-5 mx-10 my-5 rounded-2xl bg-gray-300">
        <div className="mb-10 bg-gray-200 rounded-2xl p-10">
          <h2 className="text-3xl">Clientes</h2>
        </div>
        <Table headers={headers} data={data} />
      </div>
    </>
  );
}
