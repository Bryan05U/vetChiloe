const express = require('express');
const pacientesController = require('../controllers/pacientes');

const router = express.Router();

router.get('/', pacientesController.obtenerPacientes);
router.post('/', pacientesController.registrarPaciente);
router.put('/:id', pacientesController.actualizarPaciente);

module.exports = router;