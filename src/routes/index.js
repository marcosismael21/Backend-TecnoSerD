const { Router } = require('express')

const router = Router();

//variables que heredan las routes
const authRoutes = require('./user.routes')

//establecer las rutas web
router.use('/api/v1/auth', authRoutes);

module.exports = router;