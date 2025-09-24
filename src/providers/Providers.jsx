import PropTypes from "prop-types";
import { UsuarioProvider } from "./UsuarioProvider";
import { ProdutoProvider } from "./ProdutoProvider";
import { ServiceProvider } from "./ServiceProvider";
import { VeiculoProvider } from "./VeiculoProvider";
import { AgendaProvider } from "../contexts/AgendaContext";

export function Providers({ children }) {
  return (
    <UsuarioProvider>
      <ProdutoProvider>
        <ServiceProvider>
          <VeiculoProvider>
            <AgendaProvider>{children}</AgendaProvider>
          </VeiculoProvider>
        </ServiceProvider>
      </ProdutoProvider>
    </UsuarioProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
