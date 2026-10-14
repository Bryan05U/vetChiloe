import { pacientesMock } from '../data/pacientesMock.js';

let pacientes = [...pacientesMock];

export async function obtenerPacientes() {
  return [...pacientes];
}

export async function registrarPaciente(datos) {
  const edad = Number(datos.edad);
  const peso = Number(datos.peso);
  if (!Number.isFinite(edad) || edad < 0 || !Number.isFinite(peso) || peso < 0) return null;

  const nuevoPaciente = {
    ...datos,
    id: Date.now(),
    edad: `${edad} años`,
    peso: `${peso} kg`,
    numero_atencion: `${new Date().getFullYear()}-N${pacientes.length + 1}`,
    emoji: datos.especie === 'Gato' ? '🐱' : datos.especie === 'Perro' ? '🐶' : '🐾',
    historial: [{ fecha: new Date().toISOString().slice(0, 10), detalle: 'Paciente registrado.' }],
  };

  pacientes = [...pacientes, nuevoPaciente];
  return nuevoPaciente;
}

export async function actualizarPaciente(id, datos) {
  const edad = Number(datos.edad);
  const peso = Number(datos.peso);
  if (!Number.isFinite(edad) || edad < 0 || !Number.isFinite(peso) || peso < 0) return null;

  const pacienteActualizado = pacientes.find((paciente) => paciente.id === id);
  if (!pacienteActualizado) return null;

  const resultado = {
    ...pacienteActualizado,
    ...datos,
    edad: `${edad} años`,
    peso: `${peso} kg`,
    emoji: datos.especie === 'Gato' ? '🐱' : datos.especie === 'Perro' ? '🐶' : '🐾',
  };
  pacientes = pacientes.map((paciente) => (paciente.id === id ? resultado : paciente));
  return resultado;
}