import {
  listarPacientes,
  registrarPaciente
} from '../services/pacientes.js';

export function obtenerPacientes(req, res) {
  try {
    const pacientes = listarPacientes();
    return res.status(200).json(pacientes);
  } catch {
    return res.status(500).json({
      error: 'Error al obtener los pacientes'
    });
  }
}

export function crearPaciente(req, res) {
  try {
    const nuevoPaciente = registrarPaciente(req.body);
    return res.status(201).json(nuevoPaciente);
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Error interno del servidor'
    });
  }
}