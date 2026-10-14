import { Router } from 'express';
import { crear, listar } from '../controllers/pacientes.js';

const rutas = Router();

rutas.get('/', listar);
rutas.post('/', crear);

export default rutas;
