import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!newTask || !newDate) return;
    const task = { id: Date.now(), name: newTask, date: newDate };
    setTasks([...tasks, task]);
    setNewTask("");
    setNewDate("");
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Tarefas</h2>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome da tarefa"
          className="border p-2 rounded w-full"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Adicionar
        </button>
      </div>

      <ul className="space-y-2 overflow-y-auto max-h-64 pr-1">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <div>
              <p className="font-semibold">{task.name}</p>
              <p className="text-sm text-gray-500">{task.date}</p>
            </div>
            <button onClick={() => removeTask(task.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
