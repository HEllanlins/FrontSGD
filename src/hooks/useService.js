import { useContext } from "react";
import { ServiceContext } from "../contexts/ServiceContext";

export function useService() {
  const context = useContext(ServiceContext);
  return context;
}
