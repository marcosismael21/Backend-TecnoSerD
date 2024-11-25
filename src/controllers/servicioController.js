const servicioService = require('../services/servicioService')

const getAllServicio = async (req, res, next) => {
    try {
        const servicio = await servicioService.getAllServicio()
        return res.status(200).json(servicio)
    } catch (error) {
        next(error)
    }
}

const getServicioById = async (req, res, next) => {
    const id = req.params.id
    try {
        const servicio = await servicioService.getServicioById(id)
        return res.status(200).json(servicio)
    } catch (error) {
        next(error)
    }
}

const createServicio = async (req, res, next) => {
    const {
        nombre,
        idcanal,
        estado
    } = req.body

    const data = {
        nombre,
        idcanal,
        estado
    }

    try {
        const servicio = await servicioService.createServicio(data)
        return res.status(200).json(servicio)
    } catch (error) {
        next(error)
    }
}

const updateServicio = async (req, res, next) => {
    const id = req.params.id

    const {
        nombre,
        idcanal,
        estado
    } = req.body

    const data = {
        nombre,
        idcanal,
        estado
    }

    try {
        const servicio = await servicioService.updateServicio(data, id)
        return res.status(200).json(servicio)
    } catch (error) {
        next(error)
    }
}

const deleteServicio = async (req, res, next) => {
    const id = req.params.id
    try {
        const servicio = await servicioService.deleteServicio(id)
        return res.status(200).json(servicio)
    } catch (error) {
        next(error)
    }
}

const getServicioCanal = async (req, res, next) => {
    try {
        const servicio = await servicioService.getServicioCanal()
        return res.status(200).json(servicio)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllServicio,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio,
    getServicioCanal
}