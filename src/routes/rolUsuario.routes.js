const express = require('express')

const rolUsuarioController = require('../controllers/rolUsuarioController')
const {verifyToken} = require('../middleware/index')
const router = express.Router()
const {rolUsuarioValidationRules, validate} = require('../middleware/validaciones/rolUsuarioValidation')

// Rutas para el manejo
router.get('/', verifyToken, rolUsuarioController.getAllRolUsuario)
router.get('/:id',verifyToken, rolUsuarioController.getRolUsuarioById)
router.post('/', [verifyToken, rolUsuarioValidationRules(), validate], rolUsuarioController.createRolUsuario)
router.put('/:id', [verifyToken, rolUsuarioValidationRules(), validate], rolUsuarioController.updateRolUsuario)
router.delete('/:id',verifyToken, rolUsuarioController.deleteRolUsuario)

//La exportacion
module.exports = router