// src/hooks/useFuncionario.js
import { useState, useEffect } from 'react';

export const useFuncionario = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      // Aqui seria substituído por chamada à API/backend
      const data = JSON.parse(localStorage.getItem('funcionarios')) || [];
      setFuncionarios(data);
    } catch (error) {
      console.error('Erro ao buscar funcionários', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToStorage = (newList) => {
    localStorage.setItem('funcionarios', JSON.stringify(newList));
  };

  const createFuncionario = async (funcionario) => {
    const novo = { ...funcionario, id: Date.now() };
    const atualizado = [...funcionarios, novo];
    setFuncionarios(atualizado);
    saveToStorage(atualizado);
  };

  const editFuncionario = async (id, funcionarioAtualizado) => {
    const atualizado = funcionarios.map((f) =>
      f.id === id ? { ...funcionarioAtualizado, id } : f
    );
    setFuncionarios(atualizado);
    saveToStorage(atualizado);
  };

  const deleteFuncionario = async (id) => {
    const atualizado = funcionarios.filter((f) => f.id !== id);
    setFuncionarios(atualizado);
    saveToStorage(atualizado);
  };

  return {
    funcionarios,
    loading,
    createFuncionario,
    editFuncionario,
    deleteFuncionario,
  };
};
