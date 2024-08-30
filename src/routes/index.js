const { Router } = require('express')

const router = Router();

//variables que heredan las routes
const authRoutes = require('./usuario.routes')
const comodinRoutes = require('./comodin.routes')


//establecer las rutas web
router.use('/api/v1/usuario', authRoutes);
router.use('/api/v1/comodin', comodinRoutes);

module.exports = router;