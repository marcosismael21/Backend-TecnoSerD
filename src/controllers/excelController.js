const excelService = require('../services/excelService');

const importExcelFile = async (req, res) => {
    try {
        const file = req.file; // Multer nos proporciona el archivo en el buffer
        if (!file) {
            return res.status(400).json({ message: 'No se ha proporcionado un archivo.' });
        }

        // Llamar al servicio para procesar el archivo Excel desde el buffer
        await excelService.importExcelData(file.buffer);

        res.status(200).json({ message: 'Datos importados exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al importar los datos.', error: error.message });
    }
};

const importEquipoExcelFile = async (req, res) => {
    try {
        const file = req.file; // Multer nos proporciona el archivo en el buffer
        if (!file) {
            return res.status(400).json({ message: 'No se ha proporcionado un archivo.' });
        }

        // Llamar al servicio para procesar el archivo Excel desde el buffer
        await excelService.importExcelDataUnificado(file.buffer);

        res.status(200).json({ message: 'Datos importados exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al importar los datos.', error: error.message });
    }
};

// Controlador para importar datos desde un archivo Excel
const importarExcel = async (req, res) => {
    try {
        // Verificar si se ha subido un archivo
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
        }

        // Llamar al servicio para procesar el archivo Excel
        await excelService.importExcelDataUnificado(req.file.buffer);

        return res.status(200).json({ message: 'Datos importados correctamente desde el archivo Excel.' });
    } catch (error) {
        console.error('Error al importar el archivo Excel:', error);
        return res.status(500).json({ message: 'Ocurrió un error al importar el archivo Excel.', error: error.message });
    }
};

module.exports = {
    importExcelFile,
    importEquipoExcelFile,
    importarExcel,
};
