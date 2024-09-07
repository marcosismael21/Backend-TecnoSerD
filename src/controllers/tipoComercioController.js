const tipoComercioService = require('../services/tipoComercioService')

const getAllTipoComercio = async (req, res, next) => {
    try {
        const tipoComercio = await tipoComercioService.getAllTipoComercio()
        return res.status(200).json(tipoComercio)
    } catch (error) {
        next(error)
    }
}

const getTipoComercioById = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoComercio = await tipoComercioService.getTipoComercioById(id)
        return res.status(200).json(tipoComercio)
    } catch (error) {
        next(error)
    }
}

const createTipoComercio = async (req, res, next) => {
    const {
        nombre,
        estado
    } = req.body

    const data = {
        nombre,
        estado
    }

    try {
        const tipoComercio = await tipoComercioService.createTipoComercio(data)
        return res.status(200).json(tipoComercio)
    } catch (error) {
        next(error)
    }
}

const updateTipoComercio = async (req, res, next) => {
    const id = req.params.id
    const {
        nombre,
        estado
    } = req.body

    const data = {
        nombre,
        estado
    }

    try {
        const tipoComercio = await tipoComercioService.updateTipoComercio(data, id)
        return res.status(200).json(tipoComercio)
    } catch (error) {
        next(error)
    }
}

const deleteTipoComercio = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoComercio = await tipoComercioService.deleteTipoComercio(id)
        return res.status(200).json(tipoComercio)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTipoComercio,
    getTipoComercioById,
    createTipoComercio,
    updateTipoComercio,
    deleteTipoComercio
}