const asignacionService = require('../services/asignacionService')

const getAllAsignacion = async (req, res, next) => {
    try {
        const asignacion = await asignacionService.getAllAsignacion()
        return res.status(200).json(asignacion)
    } catch (error) {
        next(error)
    }
}

const getAsignacionById = async (req, res, next) => {
    const id = req.params.id
    try {
        const asignacion = await asignacionService.getAsignacionById(id)
        return res.status(200).json(asignacion)
    } catch (error) {
        next(error)
    }
}

const createAsignacion = async (req, res, next) => {
    const {
        idComercio,
        idServicio,
        idEquipo,
        tipoProblema,
        idEstado
        
    } = req.body

    const data = {
        idComercio,
        idServicio,
        idEquipo,
        tipoProblema,
        idEstado
    }

    try {
        const asignacion = await asignacionService.createAsignacion(data)
        return res.status(200).json(asignacion)
    } catch (error) {
        next(error)
    }
}

const updateAsignacion = async (req, res, next) => {
    const id = req.params.id

    const {
        idComercio,
        idServicio,
        idEquipo,
        tipoProblema,
        idEstado
    } = req.body

    const data = {
        idComercio,
        idServicio,
        idEquipo,
        tipoProblema,
        idEstado
    }

    try {
        const asignacion = await asignacionService.updateAsignacion(data, id)
        return res.status(200).json(asignacion)
    } catch (error) {
        next(error)
    }
}

const deleteAsignacion = async (req, res, next) => {
    const id = req.params.id
    try {
        const asignacion = await asignacionService.deleteAsignacion(id)
        return res.status(200).json(asignacion)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllAsignacion,
    getAsignacionById,
    createAsignacion,
    updateAsignacion,
    deleteAsignacion
}