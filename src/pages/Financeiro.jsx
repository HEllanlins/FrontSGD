import Nav from "../components/Navbar";
import CardInfo from '../components/CardInfo';
import ChartBar from '../components/ChartBar';
import ChartLine from '../components/ChartLine';
import RecentServicesTable from '../components/RecentServicesTable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Financeiro() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    concluidos: 0,
    emAberto: 0,
    receita: 0,
    taxaConclusao: 0,
    servicosMensais: [], // [{mes: 'Jan', concluidos: 50, abertos: 20}]
    financas: [],         // [{mes: 'Jan', receita: 10000, despesas: 5000}]
    servicosRecentes: []  // [{servico: '', cliente: '', status: '', valor: 0}]
  });

  useEffect(() => {
    axios.get('http://localhost:3000/Financeiro')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    axios.put('http://localhost:3000/Financeiro', data)
      .then(() => setIsEditing(false))
      .catch(err => console.error(err));
  };
  return (
    <>
      <Nav />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Painel Financeiro</h1>
        <div className="flex justify-end mb-4">
          {isEditing ? (
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Editar</button>
          )}
        </div>
          {/* Exibição dos dados aqui - vamos modularizar isso em componentes depois */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CardInfo title="Serviços Concluídos" value="124" subtitle="+5% em relação ao período anterior" color="green" />
          <CardInfo title="Serviços em Aberto" value="42" subtitle="-2% em relação ao período anterior" color="orange" />
          <CardInfo title="Receita Mensal" value="R$ 15.840" subtitle="+12% em relação ao mês anterior" color="green" />
          <CardInfo title="Taxa de Conclusão" value="75%" subtitle="Conclusões no mês atual" color="blue" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartBar />
          <ChartLine />
        </div>

        <RecentServicesTable />
      </div>
    </>
  );
}
