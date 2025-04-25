// src/components/ChartLine.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Jan", Receita: 15000, Despesas: 9000 },
  { name: "Fev", Receita: 16000, Despesas: 10000 },
  { name: "Mar", Receita: 14000, Despesas: 8700 },
  { name: "Abr", Receita: 19000, Despesas: 11000 },
  { name: "Mai", Receita: 17000, Despesas: 9500 },
  { name: "Jun", Receita: 16000, Despesas: 9100 },
];

const ChartLine = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-2">Finanças Mensais</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Receita" stroke="#22c55e" strokeWidth={2} />
          <Line type="monotone" dataKey="Despesas" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartLine;
