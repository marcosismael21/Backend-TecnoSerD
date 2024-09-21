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
        await excelService.importEquiposExcelData(file.buffer);

        res.status(200).json({ message: 'Datos importados exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al importar los datos.', error: error.message });
    }
};

module.exports = {
    importExcelFile,
    importEquipoExcelFile,
};
