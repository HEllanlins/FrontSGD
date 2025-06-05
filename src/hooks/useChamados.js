import { useEffect, useState } from "react";
import api from "../services/axios";

export default function useChamados() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChamados() {
      try {
        const response = await api.get("/servico");
        setChamados(response.data);
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChamados();
  }, []);

  return { chamados, loading };
}
