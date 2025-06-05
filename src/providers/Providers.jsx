import PropTypes from "prop-types";
import { UsuarioProvider } from "./UsuarioProvider";
import { ProdutoProvider } from "./ProdutoProvider";
import { ServiceProvider } from "./ServiceProvider";
import { VeiculoProvider } from "./VeiculoProvider";

export function Providers({ children }) {
  return (
    <UsuarioProvider>
      <ProdutoProvider>
        <ServiceProvider>
          <VeiculoProvider>{children}</VeiculoProvider>
        </ServiceProvider>
      </ProdutoProvider>
    </UsuarioProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
