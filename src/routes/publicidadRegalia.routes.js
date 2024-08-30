//variables del entorno
const express = require('express')
const publicidadRegaliaController = require('../controllers/publicidadRegaliaController')
const {verifyToken} = require("../middleware/index")
const router = express.Router()
const {publicidadValidationRules, validate} = require("../middleware/validaciones/publicidadRegaliaValidation")

// rutas para el manejo
router.get('/',verifyToken, publicidadRegaliaController.getAllPublicidad_Regalia)
router.get('/:id',verifyToken, publicidadRegaliaController.getPublicidad_RegaliaById)
router.post('/',[verifyToken, publicidadValidationRules(), validate], publicidadRegaliaController.createPublicidad_Regalia)
router.put('/:id',[verifyToken, publicidadValidationRules(), validate],publicidadRegaliaController.updatePublicidad_Regalia)
router.delete('/:id', verifyToken, publicidadRegaliaController.deletePublicidad_Regalia)

//la exportacion

module.exports = router