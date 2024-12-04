const express = require('express')
const tableroController = require('../controllers/tableroController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()

router.get('/sparkline-instalaciones', verifyToken, tableroController.getSparklineInstalaciones)
router.get('/sparkline-soportes', verifyToken, tableroController.getSparklineSoportes)
router.get('/sparkline-retiros', verifyToken, tableroController.getSparklineRetiros)
router.get('/servicios-ciudad', verifyToken, tableroController.getServiciosPorCiudad)
router.get('/asignaciones-estado', verifyToken, tableroController.getAsignacionesPorEstado)
router.get('/crecimiento-equipos-estado', verifyToken, tableroController.getCrecimientoEquiposPorEstado)
router.get('/cantidad-estado', verifyToken, tableroController.getCantidadEquiposPorEstado)

module.exports = router