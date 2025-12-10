import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Sistema Agua Potable – Panel Principal</h1>
      <p>Bienvenido al sistema administrativo.</p>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>
        <li><Link to="/medidores">Medidores</Link></li>
        <li><Link to="/pagos">Pagos</Link></li>
      </ul>
    </div>
    
  );
}
