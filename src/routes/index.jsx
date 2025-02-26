import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Chamados from "../pages/Chamados";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chamados" element={<Chamados />} />
    </Routes>
  );
}
