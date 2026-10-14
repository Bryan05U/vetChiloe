import { Router } from 'express';
import { getPacientes, postPaciente } from '../controller/pacientes.controller.js';

const router = Router();

router.get("/", getPacientes)

router.post("/", postPaciente)

export default router;