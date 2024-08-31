const { Router } = require('express')

const router = Router();

//variables que heredan las routes
const authRoutes = require('./usuario.routes')
const publicidadRegaliaRoutes = require('./publicidadRegalia.routes')
const rolRoutes = require('./rol.routes')
const comodinRoutes = require('./comodin.routes')
const rolUsuarioRoutes = require('./rolUsuario.routes')


//establecer las rutas web
router.use('/api/v1/usuario', authRoutes);
router.use('/api/v1/rol', rolRoutes);
router.use('/api/v1/pubreg', publicidadRegaliaRoutes)
router.use('/api/v1/comodin', comodinRoutes)
router.use('/api/v1/rolusuario', rolUsuarioRoutes)

//la exportacion

module.exports = router;