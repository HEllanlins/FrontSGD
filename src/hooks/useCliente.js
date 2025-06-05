import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('/api/clientes'); // ajuste o endpoint conforme necessário
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCliente = async (novoCliente) => {
    const response = await axios.post('/api/clientes', novoCliente);
    setClientes([...clientes, response.data]);
  };

  const editCliente = async (id, clienteAtualizado) => {
    await axios.put(`/api/clientes/${id}`, clienteAtualizado);
    setClientes(clientes.map(cliente => (cliente.id === id ? clienteAtualizado : cliente)));
  };

  const deleteCliente = async (id) => {
    await axios.delete(`/api/clientes/${id}`);
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return {
    clientes,
    loading,
    createCliente,
    editCliente,
    deleteCliente
  };
};
