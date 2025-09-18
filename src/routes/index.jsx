import { Routes, Route } from "react-router-dom";

//Páginas
import Home from "../pages/Home";
import Chamados from "../pages/Chamados";
import Clientes from "../pages/Clientes";
import Estoque from "../pages/Estoque";
import Financeiro from "../pages/Financeiro";
import Veiculos from "../pages/Veiculos";
import Funcionarios from "../pages/Funcionarios";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { PrivateRoute } from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/chamados"
        element={
          <PrivateRoute>
            <Chamados />
          </PrivateRoute>
        }
      />
      <Route
        path="/clientes"
        element={
          <PrivateRoute>
            <Clientes />
          </PrivateRoute>
        }
      />
      <Route
        path="/estoque"
        element={
          <PrivateRoute>
            <Estoque />
          </PrivateRoute>
        }
      />
      <Route
        path="/financeiro"
        element={
          <PrivateRoute>
            <Financeiro />
          </PrivateRoute>
        }
      />
      <Route
        path="/veiculos"
        element={
          <PrivateRoute>
            <Veiculos />
          </PrivateRoute>
        }
      />
      <Route
        path="/funcionarios"
        element={
          <PrivateRoute>
            <Funcionarios />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
