// variables del entorno
const express = require('express')
const rolController = require('../controllers/rolController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { variasValidationRules, validate } = require('../middleware/validaciones/validacionesVarias')

// Rutas para el manejo
router.get('/', verifyToken, rolController.getAllRol)
router.get('/:id', verifyToken, rolController.getRolById)
router.post('/', [verifyToken, variasValidationRules(), validate], rolController.createRol)
router.put('/:id', [verifyToken, variasValidationRules(), validate], rolController.updateRol)
router.delete('/:id', verifyToken, rolController.deleteRol)

//la exportacion

module.exports = router