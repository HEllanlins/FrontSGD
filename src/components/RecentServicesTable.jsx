// src/components/RecentServicesTable.jsx
import React from 'react';

const data = [
  { servico: 'Instalação', cliente: 'João Silva', status: 'Concluído', valor: 'R$ 500' },
  { servico: 'Manutenção', cliente: 'Maria Souza', status: 'Em Aberto', valor: 'R$ 300' },
];

const RecentServicesTable = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-2">Serviços Recentes</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500">
          <tr>
            <th>Serviço</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-t">
              <td>{item.servico}</td>
              <td>{item.cliente}</td>
              <td>{item.status}</td>
              <td>{item.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentServicesTable;