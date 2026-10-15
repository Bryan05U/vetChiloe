import { Router } from 'express';

import {
  obtenerPacientes,
  crearPaciente
} from '../controllers/pacientes.js';

const router = Router();

router.get('/', obtenerPacientes);
router.post('/', crearPaciente);

export default router;