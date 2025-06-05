import { useState, useEffect } from 'react';

const ClienteModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    status: 'ativo',
    data_cadastro: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setCliente(initialData);
    } else {
      setCliente({
        nome: '',
        email: '',
        telefone: '',
        status: 'ativo',
        data_cadastro: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(cliente);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={cliente.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClienteModal;
