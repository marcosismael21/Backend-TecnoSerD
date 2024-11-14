const express = require('express')
const reportesController = require('../controllers/reportesController')
const { verifyToken } = require("../middleware/index")
const router = express.Router()

router.get('/asig-espera'/*, verifyToken*/, reportesController.getAllAsignacionEspera)

module.exports = router