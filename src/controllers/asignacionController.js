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
        idEstado,
        interpretacion
    } = req.body

    const data = {
        idComercio,
        idServicio,
        idEquipo,
        tipoProblema,
        idEstado,
        interpretacion
    }

    try {
        const asignacion = await asignacionService.createAsignacion(data)
        return res.status(200).json({ asignacion, message: 'Se creo correctamente.' })
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
        idEstado,
        interpretacion
    } = req.body

    const data = {
        idComercio,
        idServicio,
        idEquipo,
        tipoProblema,
        idEstado,
        interpretacion
    }

    try {
        const asignacion = await asignacionService.updateAsignacion(data, id)
        return res.status(200).json({ asignacion, message: 'Se actualizo correctamente' })
    } catch (error) {
        next(error)
    }
}

const deleteAsignacion = async (req, res, next) => {
    const id = req.params.id
    try {
        const asignacion = await asignacionService.deleteAsignacion(id)
        return res.status(200).json({ asignacion, message: 'Se elimino correctamente.' })
    } catch (error) {
        next(error)
    }
}

const getAllByComercioEstadoServicio = async (req, res, next) => {
    const { idComercio, idEstado, idServicio } = req.params
    if (!idComercio || !idEstado || !idServicio) {
        return res.status(400).json({ message: 'Faltan parámetros obligatorios' })
    }
    try {
        const asignacion = await asignacionService.getAllByComercioEstadoServicio(idComercio, idEstado, idServicio)
        return res.status(200).json(asignacion)
    } catch (error) {
        next(error)
    }
}

const updateAsignacionConTransaccion = async (req, res, next) => {
    const {
        idComercio,
        idServicio,
        idEstado,
        nuevosEquipos,
        tipoProblema,
        interpretacion,
    } = req.body

    const data = {
        idComercio,
        idServicio,
        idEstado,
        nuevosEquipos,
        tipoProblema,
        interpretacion,
    }
    try {
        const asignacion = await asignacionService.updateAsignacionConTransaccion(data)
        return res.status(200).json({ asignacion, message: 'Se actualizo correctamente.' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllAsignacion,
    getAsignacionById,
    createAsignacion,
    updateAsignacion,
    deleteAsignacion,
    getAllByComercioEstadoServicio,
    updateAsignacionConTransaccion,
}