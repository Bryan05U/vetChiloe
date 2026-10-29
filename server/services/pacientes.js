import * as repository from '../repositories/pacientes.js';

export const obtenerTodos = async () => {
  return repository.obtenerTodos();
};

export const buscar = async (texto) => {
  return repository.buscar(texto.trim());
};

export const crear = async (paciente) => {
  return repository.crear(paciente);
};