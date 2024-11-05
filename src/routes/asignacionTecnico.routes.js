// variables del entorno
const express = require('express')
const asignacionTecnicoController = require('../controllers/asignacionTecnicoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { asignacionTecnicoValidationRules, validate } = require('../middleware/validaciones/asignacionTecnicoValidation')

// Rutas para el manejo
router.post('/mat', [verifyToken, validate], asignacionTecnicoController.createMultipleAsignaciones)
router.get('/at/:idEstado', verifyToken, asignacionTecnicoController.getAllAsignacionTecnicoSQL)
router.get('/tces/:idUsuario/:idComercio/:idEstado/:idServicio', verifyToken, asignacionTecnicoController.getAllByTecnicoComercioEstadoServicio)
router.get('/', verifyToken, asignacionTecnicoController.getAllAsignacionTecnico)
router.get('/:id', verifyToken, asignacionTecnicoController.getAsignacionTecnicoById)
router.post('/', [verifyToken, asignacionTecnicoValidationRules(), validate], asignacionTecnicoController.createAsignacionTecnico)
router.post('/at', [verifyToken, validate], asignacionTecnicoController.createAsignacionTecnicoTransaction)
router.put('/:id', [verifyToken, asignacionTecnicoValidationRules(), validate], asignacionTecnicoController.updateAsignacionTecnico)
router.delete('/:id', verifyToken, asignacionTecnicoController.deleteAsignacionTecnico)
router.delete('/cancel/tcse/:idUsuario/:idComercio/:idServicio/:idEstado', verifyToken, asignacionTecnicoController.cancelarAsignacion)


//la exportacion

module.exports = router