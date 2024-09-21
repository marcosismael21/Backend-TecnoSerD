const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');
const multer = require('multer');

// Configuración de multer para manejar el archivo en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para importar el archivo Excel
router.post('/import', upload.single('file'), excelController.importExcelFile);
router.post('/equipo', upload.single('file'), excelController.importEquipoExcelFile);
router.post('/importar', upload.single('file'), excelController.importarExcel);

module.exports = router;
