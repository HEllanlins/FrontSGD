import { useContext } from 'react';
import { UsuarioContext } from '../contexts/UsuarioContext';

export function useUsuario() {
  const context = useContext(UsuarioContext);
  return context;
}
