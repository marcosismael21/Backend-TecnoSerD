// variables del entorno
const express = require('express')
const servicioController = require('../controllers/servicioController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { servicioValidationRules, validate } = require('../middleware/validaciones/servicioValidation')

// Rutas para el manejo
router.get('/', verifyToken, servicioController.getAllServicio)
router.get('/:id', verifyToken, servicioController.getServicioById)
router.post('/', [verifyToken, servicioValidationRules(), validate], servicioController.createServicio)
router.put('/:id', [verifyToken, servicioValidationRules(), validate], servicioController.updateServicio)
router.delete('/:id', verifyToken, servicioController.deleteServicio)

//la exportacion

module.exports = router