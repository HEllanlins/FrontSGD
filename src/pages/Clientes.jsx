import Table from "../components/Table";
import api from "../services/axios";

export default function Clientes() {
  const data = api.get("/clientes");

  return (
    <>
      <h1>Clientes</h1>
      <Table headers={["Nome", "Tel", "Email"]} data={data} />
    </>
  );
}
