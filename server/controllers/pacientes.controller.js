import { pacienteService } from '../services/pacientes.service.js';

export const pacienteController = {
  listar: async (req, res) => {
    try {
      const pacientes = await pacienteService.listarPacientes();
      res.status(200).json(pacientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  crear: async (req, res) => {
    try {
      const nuevo = await pacienteService.registrar(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      // Retorna 400 Bad Request si la especie o regla de negocio falló (Lámina 128)
      res.status(400).json({ error: error.message });
    }
  }
};
