import pacientesMock from '../data/pacientesMock';

// simula lo que demoraria una api real
const DEMORA = 500;

// lee la lista guardada, si no hay usa los datos de prueba
function leerPacientes() {
  const guardados = localStorage.getItem('pacientes');
  return guardados ? JSON.parse(guardados) : pacientesMock;
}

// numero que le toca a la proxima mascota, nunca se repite
function leerSiguienteNumero(lista) {
  const guardado = localStorage.getItem('siguienteNumero');
  if (guardado) return Number(guardado);

  // la primera vez parte desde el numero mas alto que ya exista
  const usados = lista.map((paciente) => Number(paciente.numero_atencion.split('-D')[1]));
  return Math.max(0, ...usados) + 1;
}

// trae todos los pacientes
export function obtenerPacientes() {
  return new Promise((resolve) => {
    const lista = leerPacientes();

    setTimeout(() => {
      resolve(lista);
    }, DEMORA);
  });
}

// registra un paciente nuevo y lo devuelve con su id, numero y primer ingreso
export function registrarPaciente(paciente) {
  return new Promise((resolve) => {
    const lista = leerPacientes();
    const numero = leerSiguienteNumero(lista);
    const hoy = new Date().toLocaleDateString('es-CL');

    const nuevoPaciente = {
      ...paciente,
      id: Date.now(),
      numero_atencion: `2026-D${numero}`,
      historial: [
        { fecha: hoy, motivo: 'Ingreso', detalle: 'Registrado en la clínica.' }
      ]
    };

    localStorage.setItem('pacientes', JSON.stringify([...lista, nuevoPaciente]));
    localStorage.setItem('siguienteNumero', numero + 1);

    setTimeout(() => {
      resolve(nuevoPaciente);
    }, DEMORA);
  });
}