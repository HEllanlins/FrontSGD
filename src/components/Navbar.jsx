import { useState, useEffect, useRef } from 'react';
import { UserIcon, Home, Settings, Users, Wrench, Warehouse, DollarSign, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsuario } from '../hooks/useUsuario';

function Navbar() {
  const [userDropdown, setUserDropdown] = useState(false);
  const [operacionalDropdown, setOperacionalDropdown] = useState(false);
  const userRef = useRef(null);
  const opRef = useRef(null);
  const navigate = useNavigate();
  const { usuario, logout } = useUsuario();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userRef.current &&
        !userRef.current.contains(event.target) &&
        opRef.current &&
        !opRef.current.contains(event.target)
      ) {
        setUserDropdown(false);
        setOperacionalDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div>
        <img src="/assets/images/LOGO.png" className="h-10 w-auto" alt="Logo" />
      </div>

      <div className="flex gap-6 items-center text-white font-medium">
        <a href="/" className="flex items-center gap-1 hover:text-gray-200">
          <Home size={18} /> Home
        </a>
        <a href="/chamados" className="flex items-center gap-1 hover:text-gray-200">
          <Settings size={18} /> Chamados
        </a>
        <a href="/clientes" className="flex items-center gap-1 hover:text-gray-200">
          <Users size={18} /> Clientes
        </a>

        <div className="relative" ref={opRef}>
          <button
            onClick={() => setOperacionalDropdown(!operacionalDropdown)}
            className="flex items-center gap-1 hover:text-gray-200">
            <Wrench size={18} /> Operacional <ChevronDown size={16} />
          </button>
          {operacionalDropdown && (
            <div className="absolute mt-2 bg-white text-black rounded shadow-md w-40 z-10">
              <a href="/veiculos" className="block px-4 py-2 hover:bg-gray-100">
                Veículos
              </a>
              <a href="/funcionarios" className="block px-4 py-2 hover:bg-gray-100">
                Funcionários
              </a>
            </div>
          )}
        </div>

        <a href="/estoque" className="flex items-center gap-1 hover:text-gray-200">
          <Warehouse size={18} /> Estoque
        </a>
        <a href="/financeiro" className="flex items-center gap-1 hover:text-gray-200">
          <DollarSign size={18} /> Financeiro
        </a>
      </div>

      <div className="relative" ref={userRef}>
        <button
          onClick={() => setUserDropdown(!userDropdown)}
          className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
          <UserIcon className="w-5 h-5" />
          <span>{usuario.nome || 'Usuário'}</span>
        </button>
        {userDropdown && (
          <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-md">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Configurações
            </a>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
