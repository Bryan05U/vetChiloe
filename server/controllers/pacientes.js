import * as service from '../services/pacientes.js';

export const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await service.obtenerTodos();
    res.json(pacientes);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({
      mensaje: 'Error al obtener pacientes'
    });
  }
};

export const buscarPacientes = async (req, res) => {
  try {
    const texto = String(req.query.q ?? '');
    const pacientes = await service.buscar(texto);
    res.json(pacientes);
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).json({
      mensaje: 'Error al buscar pacientes'
    });
  }
};

export const crearPaciente = async (req, res) => {
  try {
    const paciente = await service.crear(req.body);
    res.status(201).json(paciente);
  } catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(500).json({
      mensaje: 'Error al crear paciente'
    });
  }
};