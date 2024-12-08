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

const getAllAsignacionFinalizado = async () => {
    try {
        const reportes = await reportesRepository.getAllAsignacionFinalizado()
        return (reportes) ? reportes : []
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByCiudadFinalizada = async (idCiudad) => {
    try {
        const reportes = await reportesRepository.getAllAsignacionEsperaByCiudadFinalizada(idCiudad)
        return (reportes) ? reportes : []
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByServicioFinalizada = async (idServicio) => {
    try {
        const reportes = await reportesRepository.getAllAsignacionEsperaByServicioFinalizada(idServicio)
        return (reportes) ? reportes : []
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByCiudadServicioFinalizada = async (idCiudad, idServicio) => {
    try {
        const reportes = await reportesRepository.getAllAsignacionEsperaByCiudadServicioFinalizada(idCiudad, idServicio)
        return (reportes) ? reportes : []
    } catch (error) {
        throw error
    }
}

const getAllEquiposMalEstadobyFechaInicialFechaFinal = async (fechaInicial, fechaFinal) => {
    try {
        const reportes = await reportesRepository.getAllEquiposMalEstadobyFechaInicialFechaFinal(fechaInicial, fechaFinal)
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
    getAllAsignacionFinalizado,
    getAllAsignacionEsperaByCiudadFinalizada,
    getAllAsignacionEsperaByServicioFinalizada,
    getAllAsignacionEsperaByCiudadServicioFinalizada,
    getAllEquiposMalEstadobyFechaInicialFechaFinal,
}