// variables del entorno
const express = require('express')
const tableroController = require('../controllers/tableroController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()

// Rutas para el manejo

router.get('/sparkline-instalaciones', verifyToken, tableroController.getSparklineInstalaciones)
router.get('/sparkline-soportes', verifyToken, tableroController.getSparklineSoportes)
router.get('/sparkline-retiros', verifyToken, tableroController.getSparklineRetiros)
router.get('/servicios-ciudad', verifyToken, tableroController.getServiciosPorCiudad)
router.get('/asignaciones-estado', verifyToken, tableroController.getAsignacionesPorEstado)
router.get('/crecimiento-equipos-estado', verifyToken, tableroController.getCrecimientoEquiposPorEstado)
router.get('/cantidad-estado', verifyToken, tableroController.getCantidadEquiposPorEstado)

//la exportacion

module.exports = router