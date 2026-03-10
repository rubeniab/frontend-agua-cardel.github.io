import { useEffect, useState } from "react";
import { getUsuarios } from "../services/usuarios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

// ✅ Convierte a mayúsculas y recorta al límite
const toUpper = (value, max) => value.toUpperCase().slice(0, max);

export default function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Estados modal agregar
  const [claveNuevo, setClaveNuevo] = useState("");
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [puestoNuevo, setPuestoNuevo] = useState("");
  const [nivelNuevo, setNivelNuevo] = useState("");
  const [statusNuevo, setStatusNuevo] = useState("");
  const [contrasenaNuevo, setContrasenaNuevo] = useState("");

  // Estados modal editar
  const [claveEditar, setClaveEditar] = useState("");
  const [nombreEditar, setNombreEditar] = useState("");
  const [puestoEditar, setPuestoEditar] = useState("");
  const [nivelEditar, setNivelEditar] = useState("");
  const [statusEditar, setStatusEditar] = useState("");
  const [contrasenaEditar, setContrasenaEditar] = useState("");

  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const usuariosUnicos = [
    ...new Map(
      usuarios.map((u) => [u.nombre?.trim().toLowerCase(), u])
    ).values(),
  ];

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregar = async () => {
    if (!claveNuevo.trim() || !nombreNuevo.trim()) return;

    await fetch("http://localhost:3000/api/tabla008/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clave:     claveNuevo,      // máx 3
        nombre:    nombreNuevo,     // máx 50
        puesto:    puestoNuevo,     // máx 50
        nivel:     nivelNuevo,      // máx 10
        status:    statusNuevo,     // máx 1
        contrasena: contrasenaNuevo // máx 35
      })
    });

    setClaveNuevo("");
    setNombreNuevo("");
    setPuestoNuevo("");
    setNivelNuevo("");
    setStatusNuevo("");
    setContrasenaNuevo("");
    setOpenAgregar(false);
    cargar();
  };

  const abrirEditar = (usuario) => {
    setUsuarioActual(usuario);
    setClaveEditar(usuario.clave?.trim());
    setNombreEditar(usuario.nombre?.trim());
    setPuestoEditar(usuario.puesto?.trim());
    setNivelEditar(usuario.nivel?.trim());
    setStatusEditar(usuario.status?.trim());
    setContrasenaEditar(usuario.contrasena?.trim());
    setOpenEditar(true);
  };

  const guardarCambios = async () => {
    if (!usuarioActual) return;

    await fetch(`http://localhost:3000/api/tabla008/update/${usuarioActual.clave}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre:    nombreEditar,
        puesto:    puestoEditar,
        nivel:     nivelEditar,
        status:    statusEditar,
        contrasena: contrasenaEditar
      })
    });

    setOpenEditar(false);
    cargar();
  };

  // ✅ Campos del modelo con sus límites exactos
  const camposAgregar = [
    { label: "Clave",      value: claveNuevo,      set: setClaveNuevo,      max: 3  },
    { label: "Nombre",     value: nombreNuevo,     set: setNombreNuevo,     max: 50 },
    { label: "Puesto",     value: puestoNuevo,     set: setPuestoNuevo,     max: 50 },
    { label: "Nivel",      value: nivelNuevo,      set: setNivelNuevo,      max: 10 },
    { label: "Status",     value: statusNuevo,     set: setStatusNuevo,     max: 1  },
    { label: "Contraseña", value: contrasenaNuevo, set: setContrasenaNuevo, max: 35 },
  ];

  const camposEditar = [
    { label: "Clave",      value: claveEditar,      set: setClaveEditar,      max: 3,  disabled: true },
    { label: "Nombre",     value: nombreEditar,     set: setNombreEditar,     max: 50 },
    { label: "Puesto",     value: puestoEditar,     set: setPuestoEditar,     max: 50 },
    { label: "Nivel",      value: nivelEditar,      set: setNivelEditar,      max: 10 },
    { label: "Status",     value: statusEditar,     set: setStatusEditar,     max: 1  },
    { label: "Contraseña", value: contrasenaEditar, set: setContrasenaEditar, max: 35 },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Usuarios</h1>

      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <Autocomplete
          sx={{ width: 300 }}
          options={usuariosUnicos}
          getOptionLabel={(option) => option.nombre?.trim() || ""}
          onInputChange={(e, value) => setBusqueda(value)}
          renderInput={(params) => (
            <TextField {...params} label="Buscar usuario" size="small" />
          )}
        />
        <Button variant="contained" onClick={() => setOpenAgregar(true)}>
          Agregar usuario
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Clave</strong></TableCell>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Puesto</strong></TableCell>
              <TableCell><strong>Nivel</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuariosFiltrados.map((u) => (
              <TableRow key={u.clave}>
                <TableCell>{u.clave?.trim()}</TableCell>
                <TableCell>{u.nombre?.trim()}</TableCell>
                <TableCell>{u.puesto?.trim()}</TableCell>
                <TableCell>{u.nivel?.trim()}</TableCell>
                <TableCell>{u.status?.trim()}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" onClick={() => abrirEditar(u)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL AGREGAR */}
      <Dialog open={openAgregar} onClose={() => setOpenAgregar(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar usuario</DialogTitle>
        <DialogContent dividers>
          {camposAgregar.map(({ label, value, set, max }) => (
            <TextField
              key={label}
              label={`${label} (máx. ${max})`}
              fullWidth
              margin="normal"
              value={value}
              inputProps={{ maxLength: max }}
              onChange={(e) => set(toUpper(e.target.value, max))}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAgregar(false)}>Cancelar</Button>
          <Button variant="contained" onClick={agregar}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL EDITAR */}
      <Dialog open={openEditar} onClose={() => setOpenEditar(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Modificar usuario</DialogTitle>
        <DialogContent dividers>
          {camposEditar.map(({ label, value, set, max, disabled }) => (
            <TextField
              key={label}
              label={`${label} (máx. ${max})`}
              fullWidth
              margin="normal"
              value={value}
              disabled={disabled || false}
              inputProps={{ maxLength: max }}
              onChange={(e) => set(toUpper(e.target.value, max))}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditar(false)}>Cancelar</Button>
          <Button variant="contained" onClick={guardarCambios}>Guardar cambios</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}