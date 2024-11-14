const reportesRepository = require('../repositories/reportesRepository')

const getAllAsignacionEspera = async () => {
    try {
        const reportes = await reportesRepository.getAllAsignacionEspera()
        return (reportes) ? reportes : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllAsignacionEspera,
}