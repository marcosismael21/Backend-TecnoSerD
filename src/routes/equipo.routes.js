// variables del entorno
const express = require('express')
const equipoController = require('../controllers/equipoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { equipoValidationRules, validate } = require('../middleware/validaciones/equipoValidation')

// Rutas para el manejo
router.get('/', verifyToken, equipoController.getAllEquipo)
router.get('/cantidad', verifyToken, equipoController.getCantidadEquipos)
router.get('/cantidad-estado', verifyToken, equipoController.getCantidadEquiposPorEstado)
router.get('/ea', verifyToken, equipoController.getEquipoSinAsignar)
router.get('/:id', verifyToken, equipoController.getEquipoById)
router.post('/', [verifyToken, equipoValidationRules(), validate], equipoController.createEquipo)
router.put('/:id', [verifyToken, equipoValidationRules(), validate], equipoController.updateEquipo)
router.delete('/:id', verifyToken, equipoController.deleteEquipo)
router.get('/es/:estado', verifyToken, equipoController.getEquipoByEstado)
router.get('/comodin/:comodin', verifyToken, equipoController.getEquipoByComodin)
router.patch('/cs/:id',verifyToken,equipoController.changeEquipoStatus)

//la exportacion

module.exports = router