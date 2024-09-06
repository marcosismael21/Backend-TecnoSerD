// variables del entorno
const express = require('express')
const asignacionController = require('../controllers/asignacionController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { asignacionValidationRules, validate } = require('../middleware/validaciones/asignacionValidation')

// Rutas para el manejo
router.get('/', verifyToken, asignacionController.getAllAsignacion)
router.get('/:id', verifyToken, asignacionController.getAsignacionById)
router.post('/', [verifyToken, asignacionValidationRules(), validate], asignacionController.createAsignacion)
router.put('/:id', [verifyToken, asignacionValidationRules(), validate], asignacionController.updateAsignacion)
router.delete('/:id', verifyToken, asignacionController.deleteAsignacion)

//la exportacion

module.exports = router