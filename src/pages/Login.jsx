import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import "../styles/LoginPage.css";

function Formulario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clave_usuario: "",
    contrasena: ""
  });

  // Manejar cambios de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: data.message || "Credenciales inválidas"
        });
        return;
      }

      // Login correcto
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: `Usuario: ${data.clave_usuario}`,
        timer: 1500,
        showConfirmButton: false
      });

      navigate("/home", { state: { user: data } });

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar con el servidor"
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Left section */}
        <div className="login-left">
          <h1 className="brand-title">Catastro de [Municipio]</h1>
          
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>

      {/* Right section */}
      <div className="login-right">
        <h2>Hola de nuevo!</h2>
        <p className="welcome">Bienvenido</p>


        <form className="login-form" onSubmit={handleLogin}>
          <input name="clave_usuario" placeholder="Tipo de usuario" value={formData.clave_usuario} onChange={handleChange} />
          <input type="password" name="contrasena" placeholder="Contraseña" value={formData.contrasena} onChange={handleChange}/>
          <button type="submit">Login</button>
        </form>         

        {/*<button className="forgot">Forgot Password</button>*/}
      </div>
    </div>
  </div>
  );
}

export default Formulario;
