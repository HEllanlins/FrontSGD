import { PieChart, Pie, Cell } from "recharts";

const meta = 10000;
const ganhos = 6500;

const data = [
  { name: "Concluído", value: ganhos },
  { name: "Restante", value: meta - ganhos },
];

const COLORS = ["#4ade80", "#e5e7eb"]; // verde e cinza claro

export default function GraficoMetaMensal() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-6">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          startAngle={90}
          endAngle={-270}
          dataKey="value">
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div>
        <p className="text-gray-600">Meta Mensal</p>
        <p className="text-2xl font-bold text-green-600">R$ {meta.toLocaleString()}</p>
        <p className="text-gray-500 mt-2">Ganhos atuais:</p>
        <p className="text-lg font-semibold">R$ {ganhos.toLocaleString()}</p>
      </div>
    </div>
  );
}
