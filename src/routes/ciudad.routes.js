// variables del entorno
const express = require('express')
const ciudadController = require('../controllers/ciudadController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { variasValidationRules, validate } = require('../middleware/validaciones/validacionesVarias')

// Rutas para el manejo
router.get('/', verifyToken, ciudadController.getAllCiudad)
router.get('/:id', verifyToken, ciudadController.getCiudadById)
router.post('/', [verifyToken, variasValidationRules(), validate], ciudadController.createCiudad)
router.put('/:id', [verifyToken, variasValidationRules(), validate], ciudadController.updateCiudad)
router.delete('/:id', verifyToken, ciudadController.deleteCiudad)

//la exportacion

module.exports = router