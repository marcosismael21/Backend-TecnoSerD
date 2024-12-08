const excelService = require('../services/excelService');

// Controlador para importar datos desde un archivo Excel
const importarExcel = async (req, res) => {
    try {
        // Verificar si se ha subido un archivo
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
        }

        const interpretaciones = req.body.interpretaciones ? JSON.parse(req.body.interpretaciones) : [];

        await excelService.importExcelDataUnificado(req.file.buffer, interpretaciones);;

        return res.status(200).json({ message: 'Datos importados correctamente desde el archivo Excel.' });
    } catch (error) {
        console.error('Error al importar el archivo Excel:', error);
        return res.status(500).json({ message: 'Ocurrió un error al importar el archivo Excel.', error: error.message });
    }
};

module.exports = {
    importarExcel,
};
