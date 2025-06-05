import { useCallback, useEffect, useState } from "react";
import useVeiculoStore from "../stores/useVeiculoStore";
import api from "../services/axios";
import LoadingScreen from "../components/LoadingScreen";
import { VeiculoContext } from "../contexts/VeiculoContext";
import PropTypes from "prop-types";

export function VeiculoProvider({ children }) {
  const { veiculos, setVeiculos, addVeiculo, updateVeiculo, removeVeiculo, clearVeiculos } = useVeiculoStore();

  const [loading, setLoading] = useState(true);

  // Carregar veiculos do backend ao iniciar

  useEffect(() => {
    async function fetchVeiculos() {
      try {
        const response = await api.get("/veiculo");
        setVeiculos(response.data);
      } catch (err) {
        clearVeiculos();
        console.error(err);
      }
      setLoading(false);
    }

    fetchVeiculos();
  }, [setVeiculos, clearVeiculos]);

  // Manipulação dos veiculos em Store (ACTIONS)

  const createVeiculo = useCallback(
    async (dados) => {
      const response = await api.post("/veiculo", dados);
      addVeiculo(response.data);
      return response.data;
    },
    [addVeiculo]
  );

  const editVeiculo = useCallback(
    async (dados, id) => {
      const response = await api.put(`/veiculo/${id}`, dados);
      updateVeiculo(id, response.data);
      return response.data;
    },
    [updateVeiculo]
  );

  const deleteVeiculo = useCallback(
    async (id) => {
      await api.delete(`/veiculo/${id}`);
      removeVeiculo(id);
    },
    [removeVeiculo]
  );

  const value = {
    veiculos,
    loading,
    createVeiculo,
    editVeiculo,
    deleteVeiculo,
    setVeiculos,
    clearVeiculos,
  };

  if (loading) return <LoadingScreen texto="Carregando veiculos..." />;

  return <VeiculoContext.Provider value={value}>{children}</VeiculoContext.Provider>;
}

VeiculoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
