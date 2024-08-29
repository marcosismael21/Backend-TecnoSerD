const { Router } = require('express')

const router = Router();

//variables que heredan las routes
const authRoutes = require('./usuario.routes')

//establecer las rutas web
router.use('/api/v1/usuario', authRoutes);

module.exports = router;