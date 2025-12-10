export const getUsuarios = async () => {
  const res = await fetch("/api/usuarios");
  return await res.json();
};

export const crearUsuario = async (nombre) => {
  const res = await fetch("/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });

  return await res.json();
};
