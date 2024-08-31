// variables del entorno
const express = require('express')
const proveedorController = require('../controllers/proveedorController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { variasValidationRules, validate } = require('../middleware/validaciones/validacionesVarias')

// Rutas para el manejo
router.get('/', verifyToken, proveedorController.getAllProveedor)
router.get('/:id', verifyToken, proveedorController.getProveedorById)
router.post('/', [verifyToken, variasValidationRules(), validate], proveedorController.createProveedor)
router.put('/:id', [verifyToken, variasValidationRules(), validate], proveedorController.updateProveedor)
router.delete('/:id', verifyToken, proveedorController.deleteProveedor)

//la exportacion

module.exports = router