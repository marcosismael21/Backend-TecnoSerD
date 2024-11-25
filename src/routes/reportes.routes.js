const express = require('express')
const reportesController = require('../controllers/reportesController')
const { verifyToken } = require("../middleware/index")
const router = express.Router()

router.get('/asig-espera', verifyToken, reportesController.getAllAsignacionEspera)
router.get('/asig-espera/:idCiudad', verifyToken, reportesController.getAllAsignacionEsperaByCiudad)
router.get('/asig-espera-servicio/:idServicio', verifyToken, reportesController.getAllAsignacionEsperaByServicio)
router.get('/asig-espera/:idCiudad/:idServicio', verifyToken, reportesController.getAllAsignacionEsperaByCiudadServicio)

module.exports = router