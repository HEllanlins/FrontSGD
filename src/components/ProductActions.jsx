import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductActions = () => {
  return (
    <div className="flex space-x-3 text-blue-600">
      <button><FaEdit /></button>
      <button><FaTrash /></button>
    </div>
  );
};

export default ProductActions;