import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUsuarioStore } from '../stores/useUsuarioStore';
import api from '../services/axios';
import { jwtDecode } from 'jwt-decode';
import { UsuarioContext } from '../contexts/UsuarioContext';

export function UsuarioProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const usuarioStore = useUsuarioStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = jwtDecode(token);
        const usuarioData = {
          id: payload.userId,
          nome: payload.userName,
          cargo: payload.userRole,
          email: payload.email,
          isLogged: true
        };
        usuarioStore.updateUsuario(usuarioData);
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        localStorage.removeItem('token');
        usuarioStore.logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await api.post('/login', { email, senha });
      const token = response.data;
      localStorage.setItem('token', token);

      const payload = jwtDecode(token);
      const usuarioData = {
        id: payload.userId,
        nome: payload.userName,
        cargo: payload.userRole,
        email: email,
        isLogged: true
      };

      usuarioStore.updateUsuario(usuarioData);
      return usuarioData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    usuarioStore.logout();
  };

  const register = async dados => {
    const response = await api.post('/register', dados);
    return response.data;
  };

  const value = {
    usuario: usuarioStore.usuario,
    login,
    logout,
    register,
    updateUsuario: usuarioStore.updateUsuario,
    loading
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return <UsuarioContext.Provider value={value}>{children}</UsuarioContext.Provider>;
}

UsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired
};
