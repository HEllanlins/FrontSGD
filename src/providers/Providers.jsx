import PropTypes from "prop-types";
import { UsuarioProvider } from "./UsuarioProvider";
import { ProdutoProvider } from "./ProdutoProvider";
import { ServiceProvider } from "./ServiceProvider";

export function Providers({ children }) {
  return (
    <UsuarioProvider>
      <ProdutoProvider>
        <ServiceProvider>{children}</ServiceProvider>
      </ProdutoProvider>
    </UsuarioProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
