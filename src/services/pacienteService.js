// direccion del backend
const URL_API = 'http://localhost:3000/api/pacientes';

// GET: le pide la lista al servidor
export async function obtenerPacientes() {
  const respuesta = await fetch(URL_API);
  return respuesta.json();
}

// POST: manda el paciente nuevo y el servidor lo devuelve con su numero
export async function registrarPaciente(paciente) {
  const respuesta = await fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paciente)
  });
  const datos = await respuesta.json();

  // si el servidor respondio con error (por ejemplo 400) se avisa
  if (!respuesta.ok) {
    throw new Error(datos.error);
  }
  return datos;
}

// el servidor todavia no tiene rutas para editar ni eliminar,
// asi que por ahora estos cambios solo duran hasta recargar
export function guardarPacientes() {}