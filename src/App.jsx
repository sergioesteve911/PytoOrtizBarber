import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verificacion from "./pages/Verificacion";
import Calendario from "./pages/Calendario";
import Resumen from "./pages/Resumen";
import Gracias from "./pages/Gracias";
import Inicio from "./pages/Inicio"
import Gestion from "./pages/Gestion"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verificacion" element={<Verificacion />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/resumen" element={<Resumen />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="/gestion" element={<Gestion />} />
      </Routes>
    </Router>
  );
}
