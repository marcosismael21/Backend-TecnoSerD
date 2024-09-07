//variables del entorno
const express = require('express')
const publicidadClienteController = require('../controllers/publicidadClienteController')
const {verifyToken} = require('../middleware/index')
const router = express.Router()
const {publicidadClienteValidationRules, validate} = require('../middleware/validaciones/publicidadClienteValidation')

// rutas para el manejo
router.get('/',verifyToken,publicidadClienteController.getAllPublicidadCliente)
router.get('/:id', verifyToken,publicidadClienteController.getPublicidadClienteById)
router.post('/',[verifyToken, publicidadClienteValidationRules(), validate], publicidadClienteController.createPublicidadCliente)
router.put('/:id',[verifyToken, publicidadClienteValidationRules(), validate], publicidadClienteController.updatePublicidadCliente)
router.delete('/:id', verifyToken, publicidadClienteController.deletePublicidadCliente)

//la exportacion

module.exports = router