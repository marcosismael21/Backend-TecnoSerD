const reportesServices = require('../services/reportesServices')

const getAllAsignacionEspera = async (req, res, next) => {
    try {
        const reportes = await reportesServices.getAllAsignacionEspera()
        return res.status(200).json(reportes)
    } catch (error) {
        next(error)
    }
}

const getAllAsignacionEsperaByCiudad = async (req, res, next) => {
    const idCiudad = req.params.idCiudad
    try {
        const reportes = await reportesServices.getAllAsignacionEsperaByCiudad(idCiudad)
        return res.status(200).json(reportes)
    } catch (error) {
        next(error)
    }
}

const getAllAsignacionEsperaByServicio = async (req, res, next) => {
    const idServicio = req.params.idServicio
    try {
        const reportes = await reportesServices.getAllAsignacionEsperaByServicio(idServicio)
        return res.status(200).json(reportes)
    } catch (error) {
        next(error)
    }
}

const getAllAsignacionEsperaByCiudadServicio = async (req, res, next) => {
    const idCiudad = req.params.idCiudad
    const idServicio = req.params.idServicio
    try {
        const reportes = await reportesServices.getAllAsignacionEsperaByCiudadServicio(idCiudad, idServicio)
        return res.status(200).json(reportes)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllAsignacionEspera,
    getAllAsignacionEsperaByCiudad,
    getAllAsignacionEsperaByServicio,
    getAllAsignacionEsperaByCiudadServicio,
}