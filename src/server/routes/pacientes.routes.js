import { Router } from 'express';
import { getPacientes, postPaciente } from '../controller/pacientes.controller';

const router = Router();

router.get("/", getPacientes)

router.get("/", postPaciente)

export default router;