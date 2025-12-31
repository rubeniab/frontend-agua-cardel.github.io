import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Medidores from "./pages/Medidores";
import Pagos from "./pages/Pagos";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD CON SIDEBAR FIJO */}
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/medidores" element={<Medidores />} />
          <Route path="/pagos" element={<Pagos />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
