const rolService = require('../services/rolService')

const getAllRol = async (req, res, next) => {
    try {
        const rol = await rolService.getAllRol()
        return res.status(200).json(rol)
    } catch (error) {
        next(error)
    }
}

const getRolById = async (req, res, next) => {
    const id = req.params.id
    try {
        const rol = await rolService.getRolById(id)
        return res.status(200).json(rol)
    } catch (error) {
        next(error)
    }
}

const createRol = async (req, res, next) => {
    const {
        nombre,
        estado
    } = req.body

    const data = {
        nombre,
        estado
    }

    try {
        const rol = await rolService.createRol(data)
        return res.status(200).json({ rol, message: 'Se creo correctamente.' })
    } catch (error) {
        next(error)
    }
}

const updateRol = async (req, res, next) => {
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
        const rol = await rolService.updateRol(data, id)
        return res.status(200).json({ rol, message: 'Se actualizo correctamente.' })
    } catch (error) {
        next(error)
    }
}

const deleteRol = async (req, res, next) => {
    const id = req.params.id
    try {
        const rol = await rolService.deleteRol(id)
        return res.status(200).json({ rol, message: 'Se elimino correctamente.' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllRol,
    getRolById,
    createRol,
    updateRol,
    deleteRol
}