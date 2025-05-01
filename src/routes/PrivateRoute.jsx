import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useUsuarioStore } from "../stores/useUsuarioStore";

export function PrivateRoute({ children }) {
  const { isLogged } = useUsuarioStore((state) => state.usuario);
  const location = useLocation();

  useEffect(() => {
    if (
      !isLogged &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      toast.warning("Sessão expirada, faça login novamente.");
    }
  }, [isLogged, location.pathname]);

  if (
    !isLogged &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
