const express = require('express')

const comodinController = require('../controllers/comodinController')
const {verifyToken} = require('../middleware/index')
const router = express.Router()
const {comodinValidationRules, validate} = require('../middleware/validaciones/comodinValidation')

// Rutas para el manejo
router.get('/', verifyToken, comodinController.getAllComodin)
router.get('/:id',verifyToken, comodinController.getComodinById)
router.post('/', [verifyToken, comodinValidationRules(), validate], comodinController.createComodin)
router.put('/:id', [verifyToken, comodinValidationRules(), validate], comodinController.updateComodin)
router.delete('/:id',verifyToken, comodinController.deleteComodin)

//La exportacion

module.exports = router