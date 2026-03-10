export async function getUsuarios() {
  const res = await fetch("http://localhost:3000/api/tabla008");
  const json = await res.json();
  return json; // ← el arreglo viene aquí
}

export const crearUsuario = async (nombre) => {
  const res = await fetch("/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });

  return await res.json();
};


