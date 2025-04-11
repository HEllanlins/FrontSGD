import Nav from "../components/Navbar";
import CardInfo from '../components/CardInfo';
import ChartBar from '../components/ChartBar';
import ChartLine from '../components/ChartLine';
import RecentServicesTable from '../components/RecentServicesTable';
import React, { useState, useEffect } from 'react'; 
import api from "../services/axios";

export default function Financeiro() {

  useEffect(() => {
    async function getData() {
      const resposta = await api.get("/servico");
      setData(resposta.data);
    }
    getData();
  }, []);

  const [data1, setData1] = useState([]); // array de serviços

  //Retorna os serviços concluidos e cancelados
  let contagemConcluido = 0;
  let contagemCancelado = 0;
  
  data1.forEach((servico) => {
    if (servico.status === 'concluido') {
      contagemConcluido++;
    } else if (servico.status === 'cancelado') {
      contagemCancelado++;
    }
  }); 

  //Somando todos os registros
  const totalValor = data1.reduce((acc, servico) => acc + servico.valor, 0); //somando todos os registro

  const [data, setData] = useState({
    concluidos: contagemConcluido,
    emAberto: contagemCancelado,
    receita: 0,
    taxaConclusao: 0,
    servicosMensais: [], // [{mes: 'Jan', concluidos: 50, abertos: 20}]
    financas: [],         // [{mes: 'Jan', receita: 10000, despesas: 5000}]
    servicosRecentes: []  // [{servico: '', cliente: '', status: '', valor: 0}]
  });

  //calculando taxa de conclusão
  const total = contagemConcluido + contagemCancelado;

  const taxaConclusao = total > 0 ? ((contagemConcluido / total) * 100).toFixed(2): 0;

  return (
    <>
      <Nav />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Painel Financeiro</h1>

          {/* Exibição dos dados aqui - vamos modularizar isso em componentes depois */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CardInfo title="Serviços Concluídos" value={`${contagemConcluido}`} subtitle="+5% em relação ao período anterior" color="green" />
          <CardInfo title="Serviços em Aberto" value={`${contagemCancelado}`} subtitle="-2% em relação ao período anterior" color="orange" />
          <CardInfo title="Receita Mensal" value={`R$ ${totalValor.toFixed(2)}`} subtitle="+12% em relação ao mês anterior" color="green" />
          <CardInfo title="Taxa de Conclusão" value={`${taxaConclusao}`} subtitle="Conclusões no mês atual" color="blue" />
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
