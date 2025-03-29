import { useEffect, useState } from "react";
import anychart from "anychart";
import Navbar from "../components/Navbar";

export default function Home() {
  // Estado inicial para o valor atual da meta
  const [valorAtual, setValorAtual] = useState(3000); // Começar com R$ 3.000
  const meta = 15000;

  // Função para calcular a porcentagem atingida da meta
  const calcularPorcentagem = () => (valorAtual / meta) * 100;

  // Lista de tarefas de exemplo
  const [tasks, setTasks] = useState([
    { id: 1, name: "Comprar Desinfetante", completed: false, createdAt: new Date() },
    { id: 2, name: "Bater meta de 5 mil reais até o final da semana", completed: false, createdAt: new Date() },
    { id: 3, name: "Fazer o serviço da empresa SGD", completed: false, createdAt: new Date() },
    { id: 4, name: "Pagar aluguel", completed: false, createdAt: new Date() },
  ]);

  // Estado de paginação das tarefas
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para adicionar novas tarefas
  const [newTask, setNewTask] = useState("");

  

  // Estado para adicionar novos itens ao estoque
  const [newItem, setNewItem] = useState({ itemName: "", quantity: 0 });

  // Lista de itens no estoque com quantidade e status de feito
  const [inventory, setInventory] = useState([
    { id: 1, item: "Desinfetante", quantity: 5, completed: false },
    { id: 2, item: "Mosquicida Bico", quantity: 8, completed: false },
    { id: 3, item: "Fipromix Inseticida", quantity: 2, completed: false },
    { id: 4, item: "Rodilon Pellets", quantity: 10, completed: false },
    { id: 5, item: "Colapso Inseticida", quantity: 1, completed: false },
    { id: 6, item: "Fipromix Inseticida", quantity: 6, completed: false },
  ]);

  // Função para alternar o estado de conclusão de um item no estoque
  const toggleItemCompletion = (id) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };


  // Gráfico de Status de Serviço (não alterado)
  useEffect(() => {
    var data = [
      ["Pendente", 250],
      ["Confirmado", 550],
      ["Concluído", 1250],
      ["Cancelado", 800],
    ];

    var chart = anychart.column();
    chart.data(data);
    chart.title("Status de Serviço");

    chart.yAxis().labels().rotation(-90);
    chart.yAxis().labels().padding(0, 5, 0, 5);
    chart.xAxis().labels().rotation(-90);
    chart.xAxis().labels().padding(5, 0, 5, 0);

    chart.container("statusServico");
    chart.draw();

    // Gráfico de Pie Chart (também não alterado)
    var todayServicesChart = anychart.pie([
      { x: "A", value: 637166 },
      { x: "B", value: 721630 },
      { x: "C", value: 148662 },
      { x: "D", value: 78662 },
      { x: "E", value: 90000 },
    ]);

    todayServicesChart.title("Create a Pie chart");
    todayServicesChart.container("servicosHoje");
    todayServicesChart.draw();
  }, []);

  // Função para adicionar uma nova tarefa
  const addNewTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, name: newTask, completed: false, createdAt: new Date() }]);
      setNewTask(""); // Limpar campo após adicionar
    }
  };

  // Função para alternar o estado de conclusão de uma tarefa
  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed, completedAt: task.completed ? null : new Date() } : task
      )
    );
  };

  // Função para verificar se uma tarefa está expirada
  const calculateExpirationTime = (completedTime) => {
    if (!completedTime) return false;
    const now = new Date();
    const expirationTime = new Date(completedTime);
    expirationTime.setHours(expirationTime.getHours() + 2);
    return expirationTime < now;
  };

  // remover tarefas expiradas
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.completed || !calculateExpirationTime(task.completedAt)));
    }, 1000);
    return () => clearInterval(interval);
  }, [tasks]);

  // Função para marcar tarefas expiradas
  const markExpiredTasks = () => {
    const now = new Date();
    return tasks.map((task) => {
      if (!task.completed) {
        const timeDifference = now - new Date(task.createdAt);
        if (timeDifference > 24 * 60 * 60 * 1000) {
          return { ...task, expired: true };
        }
      }
      return task;
    });
  };

  const tasksWithExpiration = markExpiredTasks();
  const tasksPerPage = 5;
  const currentTasks = tasksWithExpiration.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  // Função para verificar os itens que precisam ser repostos (quantidade <= 10)
  const checkInventoryAlert = () => {
    return inventory.filter((item) => item.quantity <= 10); // Retorna itens com estoque baixo
  };

  const itemsToReplenish = checkInventoryAlert(); // Itens para reposição

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="h-1/2 w-full grid grid-cols-2 gap-4 p-4">
          <div className="bg-red-500 p-4">
            <h1 className="text-white">Status de Serviço</h1>
            <div id="statusServico" className="w-full h-64"></div>
          </div>

          <div className="bg-green-500 p-4 flex flex-col items-center justify-center">
            <h1 className="text-white">Meta Mensal</h1>
            <div className="relative flex justify-center items-end w-40 h-64 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className="absolute bottom-0 left-0 w-full bg-blue-500"
                style={{ height: `${calcularPorcentagem()}%` }}
              ></div>
            </div>
            <p className="text-white mt-2">Meta: R$ {meta}</p>
            <p className="text-white">Valor Atual: R$ {valorAtual}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-700 text-white rounded"
              onClick={() => setValorAtual((valor) => Math.min(valor + 1000, meta))}
            >
              Adicionar R$ 1000
            </button>
          </div>
        </div>

        <div className="h-1/2 w-full grid grid-cols-2 gap-4 p-4">
          {/* Substituição da seção de "Serviços de Hoje" por alerta de estoque */}
          <div className="bg-red-500 p-4">
            <h1 className="text-white">Itens para Reposição</h1>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <ul className="space-y-2">
                {/* Se houver itens para reposição, exibe a lista */}
                {itemsToReplenish.length > 0 ? (
                  itemsToReplenish.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span>{item.item}</span>
                      <span>{item.quantity} unidades</span>
                    </li>
                  ))
                ) : (
                  // Caso contrário, avisa que tudo está bem
                  <p className="text-green-800">Todos os itens estão em quantidade segura!</p> 
                )}
              </ul>
            </div>
          </div>

          <div className="bg-green-500 p-4">
            <h1 className="text-white">To-do List</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
              <div className="space-y-4">
                {currentTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      task.expired ? "bg-red-100 border-2 border-red-500" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="w-5 h-5"
                    />
                    <span className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}>
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between">
                {currentPage > 1 && (
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Página Anterior
                  </button>
                )}
                {currentPage * tasksPerPage < tasks.length && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Próxima Página
                  </button>
                )}
              </div>

              <div className="mt-4 flex justify-between">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Nova tarefa"
                />
                <button onClick={addNewTask} className="ml-2 bg-green-500 text-white py-2 px-4 rounded">
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
