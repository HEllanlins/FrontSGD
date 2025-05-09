import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import { useUsuarioStore } from '../stores/useUsuarioStore';
import api from '../services/axios';
import { UsuarioContext } from '../contexts/UsuarioContext';

export function UsuarioProvider({ children }) {
  const { usuario, setUsuario, clearUsuario } = useUsuarioStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = jwtDecode(token);
        setUsuario({
          id: payload.userId,
          nome: payload.userName,
          cargo: payload.userRole,
          email: payload.email,
          isLogged: true
        });
      } catch {
        localStorage.removeItem('token');
        clearUsuario();
      }
    } else {
      clearUsuario();
    }
    setLoading(false);
  }, [setUsuario, clearUsuario]);

  const login = useCallback(
    async (email, senha) => {
      const response = await api.post('/login', { email, senha });
      const token = response.data;
      localStorage.setItem('token', token);
      const payload = jwtDecode(token);
      const usuarioData = {
        id: payload.userId,
        nome: payload.userName,
        cargo: payload.userRole,
        email: payload.email,
        isLogged: true
      };
      setUsuario(usuarioData);
      return usuarioData;
    },
    [setUsuario]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    clearUsuario();
  }, [clearUsuario]);

  const register = useCallback(async dados => {
    const response = await api.post('/register', dados);
    return response.data;
  }, []);

  const value = {
    usuario,
    login,
    logout,
    register,
    loading
  };

  if (loading) return <div>Carregando...</div>;

  return <UsuarioContext.Provider value={value}>{children}</UsuarioContext.Provider>;
}

UsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired
};
