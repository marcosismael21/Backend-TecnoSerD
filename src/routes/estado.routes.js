// variables del entorno
const express = require('express')
const estadoController = require('../controllers/estadoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { estadoValidationRules, validate } = require('../middleware/validaciones/estadoValidation')

// Rutas para el manejo
router.get('/', verifyToken, estadoController.getAllEstado)
router.get('/:id', verifyToken, estadoController.getEstadoById)
router.post('/', [verifyToken, estadoValidationRules(), validate], estadoController.createEstado)
router.put('/:id', [verifyToken, estadoValidationRules(), validate], estadoController.updateEstado)
router.delete('/:id', verifyToken, estadoController.deleteEstado)

//la exportacion

module.exports = router