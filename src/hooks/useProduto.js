import { useContext } from 'react';
import { ProdutoContext } from '../contexts/ProdutoContext';

export function useProduto() {
  const context = useContext(ProdutoContext);
  return context;
}
