//variables del entorno
const express = require('express')
const tipoComercioController = require('../controllers/tipoComercioController')
const {verifyToken} = require('../middleware/index')
const router = express.Router()
const {variasValidationRules, validate} = require('../middleware/validaciones/validacionesVarias')

// rutas para el manejo
router.get('/',verifyToken,tipoComercioController.getAllTipoComercio)
router.get('/:id', verifyToken,tipoComercioController.getTipoComercioById)
router.post('/',[verifyToken, variasValidationRules(), validate], tipoComercioController.createTipoComercio)
router.put('/:id',[verifyToken, variasValidationRules(), validate], tipoComercioController.updateTipoComercio)
router.delete('/:id', verifyToken, tipoComercioController.deleteTipoComercio)

//la exportacion

module.exports = router