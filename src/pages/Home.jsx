import { useEffect } from "react";
import anychart from "anychart";
import Navbar from "../components/Navbar";

export default function Home() {
  useEffect(() => {
    // Dados
    var data = [
      ["Janeiro", 300, 180],
      ["Fevereiro", 250, 290],
      ["Março", 200, 370],
      ["Abril", 230, 400],
      ["Maio", 250, 150],
      ["Junho", 220, 230],
      ["Julho", 210, 150],
      ["Agosto", 360, 250],
      ["Setembro", 340, 180],
      ["Outubro", 220, 260],
      ["Novembro", 290, 145],
      ["Decembro", 270, 380]
    ];

    // Criar gráfico
    var chart = anychart.column();
    chart.data(data);
    chart.title("Rotated labels");

    // Ajustando rótulos dos eixos
    chart.yAxis().labels().rotation(-90);
    chart.yAxis().labels().padding(0, 5, 0, 5);
    chart.xAxis().labels().rotation(-90);
    chart.xAxis().labels().padding(5, 0, 5, 0);

    // Renderizar gráfico dentro do container específico
    chart.container("graficoFinancas");
    chart.draw();

    // Criar gráfico de pizza
    var serviceChart = anychart.pie([
      {x: "Cycling", value: 10},
      {x: "Swimming", value: 12},
      {x: "Run", value: 18},
      {x: "Hiking", value: 11},
      {x: "Alpinism", value: 9}
    ]);

    serviceChart.innerRadius("25%");
    var label = anychart.standalones.label();
    label.text("Atividades");
    label.width("100%");
    label.height("100%");
    label.adjustFontSize(true);
    label.fontColor("#60727b");
    label.hAlign("center");
    label.vAlign("middle");

    // Rótulo como o conteúdo central
    serviceChart.center().content(label);
    serviceChart.title("Donut Chart: Label in the center");
    serviceChart.container("graficoSevicos");
    serviceChart.draw();

   // Criar gráfico de pizza para serviços de hoje
   var todayServicesChart = anychart.pie([
    {x: 'A', value: 637166},
    {x: 'B', value: 721630},
    {x: 'C', value: 148662},
    {x: 'D', value: 78662},
    {x: 'E', value: 90000}
  ]);

  todayServicesChart.title('Create a Pie chart');
  todayServicesChart.container('servicosHoje');
  todayServicesChart.draw();

// Criar gráfico para To-Do List
var todoData = [
  ["Tarefa 1", 5],
  ["Tarefa 2", 3],
  ["Tarefa 3", 8],
  ["Tarefa 4", 2],
  ["Tarefa 5", 6]
];

var todoChart = anychart.bar();
todoChart.data(todoData);
todoChart.title("To-Do List - Tarefas Pendentes");
todoChart.container("listaToDo");
todoChart.draw();
}, []);

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-gray-100">
        <div className="h-1/2 w-full grid grid-cols-2 gap-4 p-4">
          <div className="bg-red-500 p-4">
            <h1 className="text-white">Gráfico Finanças</h1>
            <div id="graficoFinancas" className="w-full h-64"></div>
          </div>

          <div className="bg-green-500 p-4">
            <h1 className="text-white">Gráfico Serviços</h1>
            <div id="graficoSevicos" className="w-full h-64"></div>
          </div>
        </div>

        <div className="h-1/2 w-full grid grid-cols-2 gap-4 p-4">
          <div className="bg-red-500 p-4">
            <h1 className="text-white">Serviços de Hoje</h1>
            <div id="servicosHoje" className="w-full h-64"></div>
          </div>

          <div className="bg-green-500 p-4">
            <h1 className="text-white">To-do list</h1>
            <div id="listaToDo" className="w-full h-64"></div>
          </div>
        </div>
      </div>
    </>
  );
}
