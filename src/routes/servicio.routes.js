// variables del entorno
const express = require('express')
const servicioController = require('../controllers/servicioController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { variasValidationRules, validate } = require('../middleware/validaciones/validacionesVarias')

// Rutas para el manejo
router.get('/', verifyToken, servicioController.getAllServicio)
router.get('/:id', verifyToken, servicioController.getServicioById)
router.post('/', [verifyToken, variasValidationRules(), validate], servicioController.createServicio)
router.put('/:id', [verifyToken, variasValidationRules(), validate], servicioController.updateServicio)
router.delete('/:id', verifyToken, servicioController.deleteServicio)

//la exportacion

module.exports = router