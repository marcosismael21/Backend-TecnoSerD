const estadoService = require('../services/estadoService')

const getAllEstado = async (req, res, next) => {
    try {
        const estado = await estadoService.getAllEstado()
        return res.status(200).json(estado)
    } catch (error) {
        next(error)
    }
}

const getEstadoById = async (req, res, next) => {
    const id = req.params.id
    try {
        const estado = await estadoService.getEstadoById(id)
        return res.status(200).json(estado)
    } catch (error) {
        next(error)
    }
}

const createEstado = async (req, res, next) => {
    const {
        nombre
    } = req.body

    const data = {
        nombre
    }

    try {
        const estado = await estadoService.createEstado(data)
        return res.status(200).json(estado)
    } catch (error) {
        next(error)
    }
}

const updateEstado = async (req, res, next) => {
    const id = req.params.id

    const {
        nombre
    } = req.body

    const data = {
        nombre
    }

    try {
        const estado = await estadoService.updateEstado(data, id)
        return res.status(200).json(estado)
    } catch (error) {
        next(error)
    }
}

const deleteEstado = async (req, res, next) => {
    const id = req.params.id
    try {
        const estado = await estadoService.deleteEstado(id)
        return res.status(200).json(estado)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllEstado,
    getEstadoById,
    createEstado,
    updateEstado,
    deleteEstado
}