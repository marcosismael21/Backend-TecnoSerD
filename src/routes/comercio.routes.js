const express = require('express')

const comercioController = require('../controllers/comercioController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { comercioValidationRules, validate } = require('../middleware/validaciones/comercioValidation')

// Rutas para el manejo
router.get('/', verifyToken, comercioController.getAllComercio)
router.get('/maps/:latitud/:longitud', comercioController.getGoogleMapsLink)
router.get('/:id', verifyToken, comercioController.getComercioById)
router.post('/', [verifyToken, comercioValidationRules(), validate], comercioController.createComercio)
router.put('/:id', [verifyToken, comercioValidationRules(), validate], comercioController.updateComercio)
router.delete('/:id', verifyToken, comercioController.deleteComercio)

//La exportacion

module.exports = router