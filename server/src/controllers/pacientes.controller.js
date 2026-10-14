import * as pacienteService from '../services/pacientes.service.js';

export const listar = async (req, res) => {
  try {
    const lista = await pacienteService.listarPacientes();
    res.status(200).json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crear = async (req, res) => {
  try {
    const creado = await pacienteService.registrarPaciente(req.body);
    res.status(201).json(creado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};