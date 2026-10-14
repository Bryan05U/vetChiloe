const servicio = require('../services/pacientes.service');

// GET /api/pacientes
function listar(req, res) {
  res.status(200).json(servicio.listarPacientes());
}

// POST /api/pacientes
function crear(req, res) {
  try {
    const nuevo = servicio.crearPaciente(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    // si el servicio no dijo que codigo usar, es un error del servidor
    res.status(error.status || 500).json({ error: error.message });
  }
}

module.exports = { listar, crear };