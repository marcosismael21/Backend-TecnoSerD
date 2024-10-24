const asignacionTecnicoService = require('../services/asignacionTecnicoService')

const getAllAsignacionTecnico = async (req, res, next) => {
    try {
        const asignacionTecnico = await asignacionTecnicoService.getAllAsignacionTecnico()
        return res.status(200).json(asignacionTecnico)
    } catch (error) {
        next(error)
    }
}

const getAsignacionTecnicoById = async (req, res, next) => {
    const id = req.params.id
    try {
        const asignacionTecnico = await asignacionTecnicoService.getAsignacionTecnicoById(id)
        return res.status(200).json(asignacionTecnico)
    } catch (error) {
        next(error)
    }
}

const createAsignacionTecnico = async (req, res, next) => {
    const {
        idUsuario,
        idAsignacion,
        idEstado
    } = req.body

    const data = {
        idUsuario,
        idAsignacion,
        idEstado
    }

    try {
        const asignacionTecnico = await asignacionTecnicoService.createAsignacionTecnico(data)
        return res.status(200).json(asignacionTecnico)
    } catch (error) {
        next(error)
    }
}

const updateAsignacionTecnico = async (req, res, next) => {
    const id = req.params.id

    const {
        idUsuario,
        idAsignacion,
        idEstado
    } = req.body

    const data = {
        idUsuario,
        idAsignacion,
        idEstado
    }

    try {
        const asignacionTecnico = await asignacionTecnicoService.updateAsignacionTecnico(data, id)
        return res.status(200).json(asignacionTecnico)
    } catch (error) {
        next(error)
    }
}

const deleteAsignacionTecnico = async (req, res, next) => {
    const id = req.params.id
    try {
        const asignacionTecnico = await asignacionTecnicoService.deleteAsignacionTecnico(id)
        return res.status(200).json(asignacionTecnico)
    } catch (error) {
        next(error)
    }
}

const createAsignacionTecnicoTransaction = async (req, res, next) => {
    const {
        idUsuario,
        idComercio,
        idEstado,
        idServicio
    } = req.body

    try {
        const asignacionTecnico = await asignacionTecnicoService.createAsignacionTecnicoTransaction(idUsuario, idComercio, idEstado, idServicio)
        return res.status(200).json({ asignacionTecnico, message: 'Se creo correctamente.' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllAsignacionTecnico,
    getAsignacionTecnicoById,
    createAsignacionTecnico,
    updateAsignacionTecnico,
    deleteAsignacionTecnico,
    createAsignacionTecnicoTransaction,
}