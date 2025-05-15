import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import api from '../services/axios';
import { useState, useEffect } from 'react';

export default function GraficoStatusServico() {
  const [data, setData] = useState([]);
  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/servico/status');
        console.log('Dados recebidos:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Status dos Serviços</h2>
      <div className="flex justify-center">
        <PieChart width={400} height={250}>
          <Pie data={data} cx={200} cy={120} outerRadius={80} fill="#8884d8" dataKey="value" label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}
