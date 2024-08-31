// variables del entorno
const express = require('express')
const tipoEquipoController = require('../controllers/tipoEquipoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { tipoEquipoValidationRules, validate } = require('../middleware/validaciones/tipoEquipoValidation')

// Rutas para el manejo
router.get('/', verifyToken, tipoEquipoController.getAllTipoEquipo)
router.get('/:id', verifyToken, tipoEquipoController.getTipoEquipoById)
router.post('/', [verifyToken, tipoEquipoValidationRules(), validate], tipoEquipoController.createTipoEquipo)
router.put('/:id', [verifyToken, tipoEquipoValidationRules(), validate], tipoEquipoController.updateTipoEquipo)
router.delete('/:id', verifyToken, tipoEquipoController.deleteTipoEquipo)

//la exportacion

module.exports = router