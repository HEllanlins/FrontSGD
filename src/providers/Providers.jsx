import PropTypes from 'prop-types';
import { UsuarioProvider } from './UsuarioProvider';
import { ProdutoProvider } from './ProdutoProvider';

export function Providers({ children }) {
  return (
    <UsuarioProvider>
      <ProdutoProvider>{children}</ProdutoProvider>
    </UsuarioProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired
};
