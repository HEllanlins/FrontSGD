import { Routes, Route } from "react-router-dom";

//Páginas
import Home from "../pages/Home";
import Chamados from "../pages/Chamados";
import Clientes from "../pages/Clientes";
import Estoque from "../pages/Estoque";
import Financeiro from "../pages/Financeiro";
import Veiculos from "../pages/Veiculos";
import Funcionarios from "../pages/Funcionarios";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chamados" element={<Chamados />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/estoque" element={<Estoque />} />
      <Route path="/financeiro" element={<Financeiro />} />
      <Route path="/veiculos" element={<Veiculos />} />
      <Route path="/funcionarios" element={<Funcionarios />} />
    </Routes>
  );
}
