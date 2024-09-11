// variables del entorno
const express = require('express')
const equipoController = require('../controllers/equipoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { equipoValidationRules, validate } = require('../middleware/validaciones/equipoValidation')

// Rutas para el manejo
router.get('/', verifyToken, equipoController.getAllEquipo)
router.get('/:id', verifyToken, equipoController.getEquipoById)
router.post('/', [verifyToken, equipoValidationRules(), validate], equipoController.createEquipo)
router.put('/:id', [verifyToken, equipoValidationRules(), validate], equipoController.updateEquipo)
router.delete('/:id', verifyToken, equipoController.deleteEquipo)
router.get('/es/:estado', verifyToken, equipoController.getEquipoByEstado)

//la exportacion

module.exports = router