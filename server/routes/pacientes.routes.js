import { Router } from 'express'
import { crearPaciente, obtenerPaciente, obtenerPacientes } from '../controllers/pacientes.controller.js'

const router = Router();

router.get('/', obtenerPacientes);
router.get('/:id', obtenerPaciente);
router.post('/', crearPaciente);

export default router;
