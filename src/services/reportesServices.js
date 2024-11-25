const reportesRepository = require('../repositories/reportesRepository')

const getAllAsignacionEspera = async () => {
    try {
        const reportes = await reportesRepository.getAllAsignacionEspera()
        return (reportes) ? reportes : []
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByCiudad = async (idCiudad) => {
    try {
        const reportes = await reportesRepository.getAllAsignacionEsperaByCiudad(idCiudad)
        return (reportes) ? reportes : []
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByServicio = async (idServicio) => {
    try {
        const reportes = await reportesRepository.getAllAsignacionEsperaByServicio(idServicio)
        return (reportes) ? reportes : []
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByCiudadServicio = async (idCiudad, idServicio) => {
    try {
        const reportes = await reportesRepository.getAllAsignacionEsperaByCiudadServicio(idCiudad, idServicio)
        return (reportes) ? reportes : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllAsignacionEspera,
    getAllAsignacionEsperaByCiudad,
    getAllAsignacionEsperaByServicio,
    getAllAsignacionEsperaByCiudadServicio,
}