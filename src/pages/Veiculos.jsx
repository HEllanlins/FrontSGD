import { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import api from "../services/axios";
import Table from "../components/Table";

export default function Veiculos() {
  const [data, setData] = useState([]);

  const headers = [
    { label: "Ano", key: "ano" },
    { label: "Marca", key: "marca" },
    { label: "Modelo", key: "modelo" },
    { label: "Placa", key: "placa" },
  ];

  useEffect(() => {
    async function getData() {
      const resposta = await api.get("/veiculo");
      setData(resposta.data);
    }
    getData();
  }, []);

  return (
    <>
      <Nav />

      <div className="h-full w-full">
        <div className="px-10 py-5">
          <Table headers={headers} data={data} />
        </div>
      </div>
    </>
  );
}
