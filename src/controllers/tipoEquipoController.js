const tipoEquipoService = require('../services/tipoEquipoService')

const getAllTipoEquipo = async (req, res, next) => {
    try {
        const tipoEquipo = await tipoEquipoService.getAllTipoEquipo()
        return res.status(200).json(tipoEquipo)
    } catch (error) {
        next(error)
    }
}

const getTipoEquipoById = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoEquipo = await tipoEquipoService.getTipoEquipoById(id)
        return res.status(200).json(tipoEquipo)
    } catch (error) {
        next(error)
    }
}

const createTipoEquipo = async (req, res, next) => {
    const {
        nombre,
        idProveedor,
        estado
    } = req.body

    const data = {
        nombre,
        idProveedor,
        estado
    }

    try {
        const tipoEquipo = await tipoEquipoService.createTipoEquipo(data)
        return res.status(200).json({ tipoEquipo, message: 'Se creo correctamente.' })
    } catch (error) {
        next(error)
    }
}

const updateTipoEquipo = async (req, res, next) => {
    const id = req.params.id

    const {
        nombre,
        idProveedor,
        estado
    } = req.body

    const data = {
        nombre,
        idProveedor,
        estado
    }

    try {
        const tipoEquipo = await tipoEquipoService.updateTipoEquipo(data, id)
        return res.status(200).json({ tipoEquipo, message: 'Se actualizo correctamente.' })
    } catch (error) {
        next(error)
    }
}

const deleteTipoEquipo = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoEquipo = await tipoEquipoService.deleteTipoEquipo(id)
        return res.status(200).json({ tipoEquipo, message: 'Se elimino correctamente.' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTipoEquipo,
    getTipoEquipoById,
    createTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo
}