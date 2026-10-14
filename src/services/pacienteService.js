import { PACIENTES_MOCK } from '../data/pacientesMock';

// Simula la latencia de red para no esconder los estados de carga.
const LATENCIA_MS = 400;

// Hace de "servidor": la fuente de verdad es el servicio, no App.jsx.
let pacientes = PACIENTES_MOCK.map((paciente) => ({ ...paciente }));

const simularRespuesta = (datos) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(datos), LATENCIA_MS);
  });

export function obtenerPacientes() {
  return simularRespuesta(pacientes.map((paciente) => ({ ...paciente })));
}

export function registrarPaciente(paciente) {
  const pacienteRegistrado = { ...paciente, id: Date.now() };
  pacientes = [...pacientes, pacienteRegistrado];
  return simularRespuesta({ ...pacienteRegistrado });
}
