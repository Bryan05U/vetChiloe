const express = require('express');
const controlador = require('../controllers/pacientes.controller');

const router = express.Router();

router.get('/', controlador.listar);
router.post('/', controlador.crear);

module.exports = router;