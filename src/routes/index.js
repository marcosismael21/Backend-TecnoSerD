const { Router } = require('express')

const router = Router();

//variables que heredan las routes
const authRoutes = require('./usuario.routes')
const publicidadRegaliaRoutes = require('./publicidadRegalia.routes')
const rolRoutes = require('./rol.routes')
const rolUsuarioRoutes = require('./rolUsuario.routes')
const servicioRoutes = require('./servicio.routes')
const proveedorRoutes = require('./proveedor.routes')
const tipoEquipoRoutes = require('./tipoEquipo.routes')
const equipoRoutes = require('./equipo.routes')
const asignacionRoutes = require('./asignacion.routes')
const asignacionTecnicoRoutes = require('./asignacionTecnico.routes')

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
//la exportacion
module.exports = router;