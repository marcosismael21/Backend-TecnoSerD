const express = require('express')
const reportesController = require('../controllers/reportesController')
const { verifyToken } = require("../middleware/index")
const router = express.Router()

router.get('/asig-espera', verifyToken, reportesController.getAllAsignacionEspera)
router.get('/asig-espera/:idCiudad', verifyToken, reportesController.getAllAsignacionEsperaByCiudad)
router.get('/asig-espera-servicio/:idServicio', verifyToken, reportesController.getAllAsignacionEsperaByServicio)
router.get('/asig-espera/:idCiudad/:idServicio', verifyToken, reportesController.getAllAsignacionEsperaByCiudadServicio)

// reportes finalizadas

router.get('/asig-finalizado', verifyToken, reportesController.getAllAsignacionFinalizado)
router.get('/asig-finalizado/:idCiudad', verifyToken, reportesController.getAllAsignacionEsperaByCiudadFinalizada)
router.get('/asig-finalizado-servicio/:idServicio', verifyToken, reportesController.getAllAsignacionEsperaByServicioFinalizada)
router.get('/asig-finalizado/:idCiudad/:idServicio', verifyToken, reportesController.getAllAsignacionEsperaByCiudadServicioFinalizada)


// reporte de equipos dañados
router.get('/equipo-mal-estado/:fechaInicial/:fechaFinal', verifyToken, reportesController.getAllEquiposMalEstadobyFechaInicialFechaFinal)

module.exports = router