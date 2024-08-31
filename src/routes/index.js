const { Router } = require('express')

const router = Router();

//variables que heredan las routes
const authRoutes = require('./usuario.routes')
const publicidadRegaliaRoutes = require('./publicidadRegalia.routes')
const publicidadClienteRoutes = require('./publicidadCliente.routes')
const agenteRoutes = require('./agente.routes')
const rolRoutes = require('./rol.routes')

//establecer las rutas web
router.use('/api/v1/usuario', authRoutes);
router.use('/api/v1/rol', rolRoutes);
router.use('/api/v1/pubreg', publicidadRegaliaRoutes)
router.use('/api/v1/pubcli', publicidadClienteRoutes)
router.use('/api/v1/agente', agenteRoutes)


module.exports = router;