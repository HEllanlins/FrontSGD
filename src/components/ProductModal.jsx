import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProductModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    quantidade: "",
    preco: "",
    status: "Disponível",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome,
        categoria: initialData.categoria,
        quantidade: initialData.qtd_estoque ?? initialData.quantidade ?? "",
        preco: initialData.preco,
      });
    } else {
      setForm({
        nome: "",
        categoria: "",
        quantidade: "",
        preco: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to determine status based on quantidade
  function getStatus(quantidade) {
    if (quantidade > 10) return "Disponível";
    if (quantidade > 0) return "Baixo";
    return "Esgotado";
  }

  const handleSubmit = () => {
    const data = new Date().toLocaleDateString("pt-BR");
    const quantidade = parseInt(form.quantidade);
    const status = getStatus(quantidade);
    // Use qtd_estoque for API
    const payload = {
      ...form,
      qtd_estoque: quantidade,
      status,
      ultima_atualizacao: data,
    };
    if (initialData && initialData.id) {
      payload.id = initialData.id;
    }
    delete payload.quantidade;
    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          {initialData ? "Editar Produto" : "Adicionar Produto"}
        </h2>
        <div className="space-y-3">
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="categoria"
            placeholder="Categoria"
            value={form.categoria}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="quantidade"
            placeholder="Quantidade"
            type="number"
            value={form.quantidade}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="preco"
            placeholder="Preço"
            value={form.preco}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    nome: PropTypes.string,
    categoria: PropTypes.string,
    qtd_estoque: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    quantidade: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    preco: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

export default ProductModal;
