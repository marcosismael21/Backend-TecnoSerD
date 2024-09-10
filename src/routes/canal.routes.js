// variables del entorno
const express = require('express')
const canalController = require('../controllers/canalController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { canalValidationRules, validate } = require('../middleware/validaciones/canalValidation')

// Rutas para el manejo
router.get('/', verifyToken, canalController.getAllCanal)
router.get('/:id', verifyToken, canalController.getCanalById)
router.post('/', [verifyToken, canalValidationRules(), validate], canalController.createCanal)
router.put('/:id', [verifyToken, canalValidationRules(), validate], canalController.updateCanal)
router.delete('/:id', verifyToken, canalController.deleteCanal)

//la exportacion

module.exports = router