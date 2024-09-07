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
const agenteRoutes = require('./agente.routes')
const tipoEquipoRoutes = require('./tipoEquipo.routes')
const ciudadRoutes = require('./ciudad.routes')

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
router.use('/api/v1/agente', agenteRoutes)
router.use('/api/v1/ciudad', ciudadRoutes)

//la exportacion
module.exports = router;