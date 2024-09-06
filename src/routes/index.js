const { Router } = require('express')

const router = Router();

//variables que heredan las routes
const authRoutes = require('./usuario.routes')
const publicidadRegaliaRoutes = require('./publicidadRegalia.routes')
const rolRoutes = require('./rol.routes')
const comodinRoutes = require('./comodin.routes')
const rolUsuarioRoutes = require('./rolUsuario.routes')
const servicioRoutes = require('./servicio.routes')
const proveedorRoutes = require('./proveedor.routes')
const publicidadClienteRoutes = require('./publicidadCliente.routes')
const tipoComercioRoutes = require('./tipoComercio.routes')
const tipoEquipoRoutes = require('./tipoEquipo.routes')

//establecer las rutas web
router.use('/api/v1/usuario', authRoutes);
router.use('/api/v1/rol', rolRoutes);
router.use('/api/v1/pubreg', publicidadRegaliaRoutes)
router.use('/api/v1/comodin', comodinRoutes)
router.use('/api/v1/rolusuario', rolUsuarioRoutes)
router.use('/api/v1/servicio', servicioRoutes)
router.use('/api/v1/proveedor', proveedorRoutes);
router.use('/api/v1/tipoequipo', tipoEquipoRoutes);
router.use('/api/v1/pubcli', publicidadClienteRoutes)
router.use('/api/v1/tipcom', tipoComercioRoutes)

//la exportacion
module.exports = router;