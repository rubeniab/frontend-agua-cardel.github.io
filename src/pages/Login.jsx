import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (usuario === "admin" && password === "1234") {
      navigate("/home");   // ← REDIRECCIÓN
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">💦</div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="USUARIO"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            INICIAR SESION
          </button>
        </form>

      </div>
    </div>
  );
}