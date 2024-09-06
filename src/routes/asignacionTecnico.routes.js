// variables del entorno
const express = require('express')
const asignacionTecnicoController = require('../controllers/asignacionTecnicoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { asignacionTecnicoValidationRules, validate } = require('../middleware/validaciones/asignacionTecnicoValidation')

// Rutas para el manejo
router.get('/', verifyToken, asignacionTecnicoController.getAllAsignacionTecnico)
router.get('/:id', verifyToken, asignacionTecnicoController.getAsignacionTecnicoById)
router.post('/', [verifyToken, asignacionTecnicoValidationRules(), validate], asignacionTecnicoController.createAsignacionTecnico)
router.put('/:id', [verifyToken, asignacionTecnicoValidationRules(), validate], asignacionTecnicoController.updateAsignacionTecnico)
router.delete('/:id', verifyToken, asignacionTecnicoController.deleteAsignacionTecnico)

//la exportacion

module.exports = router