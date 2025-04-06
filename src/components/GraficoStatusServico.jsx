import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Concluídos", value: 40 },
  { name: "Em Andamento", value: 30 },
  { name: "Cancelados", value: 30 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

export default function GraficoStatusServico() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Status dos Serviços</h2>
      <PieChart width={400} height={250}>
        <Pie data={data} cx={200} cy={100} outerRadius={80} fill="#8884d8" dataKey="value" label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
