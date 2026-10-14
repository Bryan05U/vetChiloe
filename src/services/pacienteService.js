// La API es la única fuente de datos: ninguna función de aquí resuelve
// información por su cuenta, solo transporta la petición HTTP y normaliza
// los errores del servidor.
const BASE_URL = 'http://localhost:3000/api/pacientes';

const pedir = async (url, opciones) => {
  const respuesta = await fetch(url, opciones);
  const cuerpo = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    throw new Error(cuerpo?.error ?? `La API respondió con un error ${respuesta.status}.`);
  }

  return cuerpo;
};

export function obtenerPacientes() {
  return pedir(BASE_URL);
}

export function registrarPaciente(paciente) {
  return pedir(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paciente),
  });
}
