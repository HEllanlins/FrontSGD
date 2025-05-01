import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export function PrivateRoute({ children }) {
  const isLogged = localStorage.getItem("isLogged");
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
