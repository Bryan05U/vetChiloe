import { Router } from 'express';
import { pacienteController } from '../controllers/pacientes.controller.js';

const router = Router();

router.get('/', pacienteController.listar);
router.post('/', pacienteController.crear);

export default router;
