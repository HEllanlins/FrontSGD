import { Routes, Route } from "react-router-dom";

//Páginas
import Home from "../pages/Home";
import Chamados from "../pages/Chamados";
import Clientes from "../pages/Clientes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chamados" element={<Chamados />} />
      <Route path="/clientes" element={<Clientes />} />
    </Routes>
  );
}
