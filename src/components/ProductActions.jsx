const ProductActions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex justify-center gap-2">
      <button onClick={onEdit} className="text-blue-600 hover:text-blue-800 transition" title="Editar">
        ✏️
      </button>
      <button onClick={onDelete} className="text-red-600 hover:text-red-800 transition" title="Excluir">
        🗑️
      </button>
    </div>
  );
};

export default ProductActions;
