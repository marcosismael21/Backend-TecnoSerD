const { Router } = require('express')

const router = Router();

//variables que heredan las routes
const authRoutes = require('./usuario.routes')
const publicidadRegaliaRoutes = require('./publicidadRegalia.routes')
const rolRoutes = require('./rol.routes')
const rolUsuarioRoutes = require('./rolUsuario.routes')
const servicioRoutes = require('./servicio.routes')
const proveedorRoutes = require('./proveedor.routes')
const publicidadClienteRoutes = require('./publicidadCliente.routes')
const tipoComercioRoutes = require('./tipoComercio.routes')
const tipoEquipoRoutes = require('./tipoEquipo.routes')
const canalRoutes = require('./canal.routes')
const estadoRoutes = require('./estado.routes')
const ciudadRoutes = require('./ciudad.routes')
const comercioRoutes = require('./comercio.routes')
const equipoRoutes = require('./equipo.routes')
const asignacionRoutes = require('./asignacion.routes')
const asignacionTecnicoRoutes = require('./asignacionTecnico.routes')
const excelRoutes = require('./excel.routes')
const tableroRoutes = require('./tablero.routes')

//establecer las rutas web
router.use('/api/v1/usuario', authRoutes);
router.use('/api/v1/rol', rolRoutes);
router.use('/api/v1/pubreg', publicidadRegaliaRoutes)
router.use('/api/v1/rolusuario', rolUsuarioRoutes)
router.use('/api/v1/servicio', servicioRoutes)
router.use('/api/v1/proveedor', proveedorRoutes);
router.use('/api/v1/tipoequipo', tipoEquipoRoutes);
router.use('/api/v1/equipo', equipoRoutes);
router.use('/api/v1/asignacion', asignacionRoutes);
router.use('/api/v1/asignacionTecnico', asignacionTecnicoRoutes);
router.use('/api/v1/pubcli', publicidadClienteRoutes)
router.use('/api/v1/tipcom', tipoComercioRoutes)
router.use('/api/v1/canal', canalRoutes)
router.use('/api/v1/estado', estadoRoutes)
router.use('/api/v1/ciudad', ciudadRoutes)
router.use('/api/v1/comercio', comercioRoutes)
router.use('/api/v1/excel', excelRoutes)
router.use('/api/v1/tablero', tableroRoutes)

//la exportacion
module.exports = router;