import * as repositorio from '../repositories/pacientes.js';

export const ESPECIES_VALIDAS = ['Felino', 'Canino'];

export class ErrorValidacion extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = 'ErrorValidacion';
  }
}

const generarNumeroAtencion = () => {
  const correlativo = repositorio.listar().length + 1;
  return `${new Date().getFullYear()}-${String(correlativo).padStart(3, '0')}`;
};

export function obtenerPacientes() {
  return repositorio.listar();
}

export function registrarPaciente(datos) {
  const nombre = typeof datos?.nombre === 'string' ? datos.nombre.trim() : '';
  if (!nombre) {
    throw new ErrorValidacion('El nombre del paciente es obligatorio.');
  }

  const especie = typeof datos?.especie === 'string' ? datos.especie.trim() : '';
  if (!ESPECIES_VALIDAS.includes(especie)) {
    throw new ErrorValidacion(
      `La especie debe ser ${ESPECIES_VALIDAS.join(' o ')}. Se recibió: ${datos?.especie ?? 'vacío'}.`,
    );
  }

  // El N° de atención lo emite el servidor, no el cliente.
  return repositorio.crear({
    ...datos,
    nombre,
    especie,
    numero_atencion: generarNumeroAtencion(),
  });
}
