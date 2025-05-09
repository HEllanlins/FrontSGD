import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useUsuario } from '../hooks/useUsuario';

export function PrivateRoute({ children }) {
  const { usuario } = useUsuario();
  const location = useLocation();

  useEffect(() => {
    if (!usuario.isLogged && location.pathname !== '/login' && location.pathname !== '/register') {
      toast.warning('Sessão expirada, faça login novamente.');
    }
  }, [usuario.isLogged, location.pathname]);

  if (!usuario.isLogged && location.pathname !== '/login' && location.pathname !== '/register') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};
