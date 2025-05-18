import { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import ClienteTable from "../components/ClienteTable";

const Clientes = () => {
  useEffect(() => {
    document.title = "SGD - Clientes";
  });

  const [clientes, setClientes] = useState([
    { nome: "João Silva", email: "joao@exemplo.com", telefone: "(11) 98765-4321", empresa: "Empresa A" },
    { nome: "Maria Oliveira", email: "maria@exemplo.com", telefone: "(21) 91234-5678", empresa: "Empresa B" },
    { nome: "Carlos Santos", email: "carlos@exemplo.com", telefone: "(31) 99876-5432", empresa: "Empresa C" },
  ]);

  const handleAdd = () => {
    const nome = prompt("Nome:");
    const email = prompt("Email:");
    const telefone = prompt("Telefone:");
    const empresa = prompt("Empresa:");
    if (nome && email && telefone && empresa) {
      setClientes([...clientes, { nome, email, telefone, empresa }]);
    }
  };

  const handleEdit = (cliente) => {
    const nome = prompt("Novo nome:", cliente.nome);
    const email = prompt("Novo email:", cliente.email);
    const telefone = prompt("Novo telefone:", cliente.telefone);
    const empresa = prompt("Nova empresa:", cliente.empresa);
    if (nome && email && telefone && empresa) {
      const atualizados = clientes.map((c) => (c === cliente ? { nome, email, telefone, empresa } : c));
      setClientes(atualizados);
    }
  };

  const handleDelete = (cliente) => {
    const confirm = window.confirm(`Deseja excluir ${cliente.nome}?`);
    if (confirm) {
      setClientes(clientes.filter((c) => c !== cliente));
    }
  };

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Gerenciamento de Clientes</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-800" onClick={handleAdd}>
            ➕ Adicionar Cliente
          </button>
        </div>
        <ClienteTable clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default Clientes;
