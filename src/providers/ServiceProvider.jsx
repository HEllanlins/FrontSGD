import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import api from "../services/axios";
import LoadingScreen from "../components/LoadingScreen";
import { useServiceStore } from "../stores/useServiceStore";
import { ServiceContext } from "../contexts/ServiceContext";

export function ServiceProvider({ children }) {
  const { services, setServices, addService, updateService, removeService, clearServices } = useServiceStore();
  const [loading, setLoading] = useState(true);

  // Carregar serviços do backend ao iniciar
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await api.get("/servico");
        setServices(response.data);
      } catch {
        setServices([]);
      }
      setLoading(false);
    }
    fetchServices();
  }, [setServices]);

  // Métodos para manipular Services
  const createService = useCallback(
    async (dados) => {
      const response = await api.post("/servico", dados);
      addService(response.data);
      return response.data;
    },
    [addService]
  );

  const editService = useCallback(
    async (id, dados) => {
      const response = await api.put(`/servico/${id}`, dados);
      updateService(id, response.data);
      return response.data;
    },
    [updateService]
  );

  const deleteService = useCallback(
    async (id) => {
      await api.delete(`/servico/${id}`);
      removeService(id);
    },
    [removeService]
  );

  const value = {
    services,
    loading,
    createService,
    editService,
    deleteService,
    setServices,
    clearServices,
  };

  if (loading) return <LoadingScreen texto="Carregando..." />;

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
}

ServiceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
