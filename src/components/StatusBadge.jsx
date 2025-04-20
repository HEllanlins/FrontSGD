const statusColors = {
    Disponível: 'bg-blue-100 text-blue-800',
    Baixo: 'bg-yellow-100 text-yellow-800',
    Esgotado: 'bg-red-100 text-red-800',
  };
  
  const StatusBadge = ({ status }) => {
    return (
      <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };
  
  export default StatusBadge;