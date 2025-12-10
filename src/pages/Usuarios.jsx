import { useEffect, useState } from "react";
import { getUsuarios, crearUsuario } from "../services/usuarios";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const agregar = async () => {
    if (!nombre.trim()) return;
    await crearUsuario(nombre);
    setNombre("");
    cargar();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Usuarios</h1>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nuevo usuario"
      />
      
      <button onClick={agregar}>Agregar</button>

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>{u.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
