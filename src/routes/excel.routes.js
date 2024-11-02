const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');
const multer = require('multer');
const { verifyToken } = require('../middleware/index')

// Configuración de multer para manejar el archivo en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para importar el archivo Excel
router.post('/importar', upload.single('file'), verifyToken, excelController.importarExcel);

module.exports = router;
