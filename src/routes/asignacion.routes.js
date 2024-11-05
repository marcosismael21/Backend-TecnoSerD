// variables del entorno
const express = require('express')
const asignacionController = require('../controllers/asignacionController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { asignacionValidationRules, validate } = require('../middleware/validaciones/asignacionValidation')

// Rutas para el manejo
router.put('/t', verifyToken, asignacionController.updateAsignacionConTransaccion)
router.get('/', verifyToken, asignacionController.getAllAsignacion)
router.get('/:id', verifyToken, asignacionController.getAsignacionById)
router.get('/ces/:idComercio/:idEstado/:idServicio', verifyToken, asignacionController.getAllByComercioEstadoServicio)
router.get('/s/:idEstado', verifyToken, asignacionController.getAllAsignacionByIdEstado)
router.post('/', [verifyToken, asignacionValidationRules(), validate], asignacionController.createAsignacion)
router.put('/:id', [verifyToken, asignacionValidationRules(), validate], asignacionController.updateAsignacion)
router.delete('/:id', verifyToken, asignacionController.deleteAsignacion)
router.delete('/cse/:idComercio/:idServicio/:idEstado', verifyToken, asignacionController.deleteAsignacionTransaction)

//la exportacion

module.exports = router