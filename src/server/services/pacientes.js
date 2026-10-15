import {
  obtenerTodos,
  crear,
  siguienteId
} from '../repositories/pacientes.js';

export function listarPacientes() {
  return obtenerTodos();
}

export function registrarPaciente(datos) {
  const nombre = datos.nombre?.trim();
  const especie = datos.especie;

  if (!nombre) {
    const error = new Error('El nombre es obligatorio');
    error.status = 400;
    throw error;
  }

  if (!['Felino', 'Canino'].includes(especie)) {
    const error = new Error(
      'La especie debe ser Felino o Canino'
    );
    error.status = 400;
    throw error;
  }

  const id = siguienteId();

  const nuevoPaciente = {
    ...datos,
    id,
    nombre,
    numero_atencion: `2026-${String(id).padStart(3, '0')}`
  };

  return crear(nuevoPaciente);
}