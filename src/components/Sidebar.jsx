import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Agua Potable</h2>

      <nav>
        <ul className="sidebar-list">
          <li><Link to="/home">Inicio</Link></li>
          <li><Link to="/usuarios">Usuarios</Link></li>
          <li><Link to="/medidores">Medidores</Link></li>
          <li><Link to="/pagos">Pagos</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
