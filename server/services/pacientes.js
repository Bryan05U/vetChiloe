const pacientesRepository = require('../repositories/pacientes');

const especiesPermitidas = new Set(['Felino', 'Canino']);

function validarPaciente(datos) {
  if (!especiesPermitidas.has(datos.especie)) {
    const error = new Error('La especie debe ser Felino o Canino.');
    error.statusCode = 400;
    throw error;
  }

  const edad = Number(datos.edad);
  const peso = Number(datos.peso);
  if (!Number.isFinite(edad) || edad < 0 || !Number.isFinite(peso) || peso < 0) {
    const error = new Error('La edad y el peso deben ser números no negativos.');
    error.statusCode = 400;
    throw error;
  }

  return { ...datos, edad, peso };
}

async function obtenerPacientes() {
  return pacientesRepository.obtenerTodos();
}

async function registrarPaciente(datos) {
  const pacienteValidado = validarPaciente(datos);
  const totalPacientes = await pacientesRepository.contar();
  const nuevoPaciente = {
    ...pacienteValidado,
    numero_atencion: `${new Date().getFullYear()}-N${totalPacientes + 1}`,
    emoji: pacienteValidado.especie === 'Felino' ? '🐱' : '🐶',
    historial: [{ fecha: new Date().toISOString().slice(0, 10), detalle: 'Paciente registrado.' }],
  };

  return pacientesRepository.crear(nuevoPaciente);
}

async function actualizarPaciente(id, datos) {
  const pacienteActual = await pacientesRepository.obtenerPorId(id);
  if (!pacienteActual) return null;

  const pacienteValidado = validarPaciente({ ...pacienteActual, ...datos });
  return pacientesRepository.actualizar(id, {
    ...pacienteValidado,
    emoji: pacienteValidado.especie === 'Felino' ? '🐱' : '🐶',
  });
}

module.exports = { obtenerPacientes, registrarPaciente, actualizarPaciente };