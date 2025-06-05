import { useState, useEffect } from 'react';

const FuncionarioModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    status: 'ativo',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        email: initialData.email || '',
        telefone: initialData.telefone || '',
        cargo: initialData.cargo || '',
        status: initialData.status || 'ativo',
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cargo: '',
        status: 'ativo',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          {initialData ? 'Editar Funcionário' : 'Adicionar Funcionário'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="cargo">Cargo</label>
            <input
              id="cargo"
              name="cargo"
              type="text"
              value={formData.cargo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuncionarioModal;
