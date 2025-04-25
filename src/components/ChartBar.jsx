// src/components/ChartBar.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", Concluídos: 65, "Em Aberto": 30 },
  { name: "Fev", Concluídos: 60, "Em Aberto": 32 },
  { name: "Mar", Concluídos: 80, "Em Aberto": 25 },
  { name: "Abr", Concluídos: 78, "Em Aberto": 30 },
  { name: "Mai", Concluídos: 58, "Em Aberto": 45 },
  { name: "Jun", Concluídos: 57, "Em Aberto": 35 },
];

const ChartBar = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-2">Serviços Realizados vs. Abertos</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Concluídos" fill="#22c55e" />
          <Bar dataKey="Em Aberto" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;
