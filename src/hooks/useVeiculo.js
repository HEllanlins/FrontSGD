import { useContext } from "react";
import { VeiculoContext } from "../contexts/VeiculoContext";

export function useVeiculo() {
  const context = useContext(VeiculoContext);
  return context;
}
