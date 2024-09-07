//variables del entorno
const express = require('express')
const agenteController = require('../controllers/agenteController')
const {verifyToken} = require('../middleware/index')
const router = express.Router()
const {variasValidationRules, validate} = require('../middleware/validaciones/validacionesVarias')

// rutas para el manejo
router.get('/',verifyToken,agenteController.getAllAgente)
router.get('/:id', verifyToken,agenteController.getAgenteById)
router.post('/',[verifyToken, variasValidationRules(), validate], agenteController.createAgente)
router.put('/:id',[verifyToken, variasValidationRules(), validate], agenteController.updateAgente)
router.delete('/:id', verifyToken, agenteController.deleteAgente)

//la exportacion

module.exports = router