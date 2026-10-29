import { Router } from 'express';

import {
  obtenerPacientes,
  crearPaciente,
  buscarPacientes
} from '../controllers/pacientes.js';

const router = Router();

// Buscar pacientes por nombre o especie
router.get('/buscar', buscarPacientes);

// Obtener todos los pacientes
router.get('/', obtenerPacientes);

// Registrar un paciente
router.post('/', crearPaciente);

export default router;