import Nav from "../components/Navbar";
import CardInfo from "../components/CardInfo";
import ChartBar from "../components/ChartBar";
import ChartLine from "../components/ChartLine";
import RecentServicesTable from "../components/RecentServicesTable";

export default function Financeiro() {
  //Retorna os serviços concluidos e cancelados
  let contagemConcluido = 0;
  let contagemCancelado = 0;

  //calculando taxa de conclusão
  const total = contagemConcluido + contagemCancelado;

  const taxaConclusao = total > 0 ? ((contagemConcluido / total) * 100).toFixed(2) : 0;

  const totalValor = contagemConcluido * 100;

  return (
    <>
      <Nav />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Painel Financeiro</h1>

        {/* Exibição dos dados aqui - vamos modularizar isso em componentes depois */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CardInfo
            title="Serviços Concluídos"
            value={`${contagemConcluido}`}
            subtitle="+5% em relação ao período anterior"
            color="green"
          />
          <CardInfo
            title="Serviços em Aberto"
            value={`${contagemCancelado}`}
            subtitle="-2% em relação ao período anterior"
            color="orange"
          />
          <CardInfo
            title="Receita Mensal"
            value={`R$ ${totalValor.toFixed(2)}`}
            subtitle="+12% em relação ao mês anterior"
            color="green"
          />
          <CardInfo
            title="Taxa de Conclusão"
            value={`${taxaConclusao}`}
            subtitle="Conclusões no mês atual"
            color="blue"
          />
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
