import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ width: 200, background: "#f2f2f2", padding: 20 }}>
      <h3>Menú</h3>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>
        <li><Link to="/medidores">Medidores</Link></li>
        <li><Link to="/pagos">Pagos</Link></li>
      </ul>
    </aside>
  );
}
