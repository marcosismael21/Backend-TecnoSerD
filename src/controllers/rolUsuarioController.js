const rolUsuarioService = require('../services/rolUsuarioService')

const getAllRolUsuario = async (req, res, next) => {
    try {
        const rolUsuario = await rolUsuarioService.getAllRolUsuario()
        return res.status(200).json(rolUsuario)
    } catch (error) {
        next(error)
    }
}

const getRolUsuarioById = async (req, res, next) => {
    const id = req.params.id
    try {
        const rolUsuario = await rolUsuarioService.getRolUsuarioById(id)
        return res.status(200).json(rolUsuario)
    } catch (error) {
        next(error)
    }
}

const createRolUsuario = async (req, res, next) => {
    const {
        idRol,
        idUsuario,
        estado
    } = req.body

    const data = {
        idRol,
        idUsuario,
        estado
    }

    try {
        const rolUsuario = await rolUsuarioService.createRolUsuario(data)
        return res.status(200).json(rolUsuario)
    } catch (error) {
        next(error)
    }
}

const updateRolUsuario = async (req, res, next) => {
    const id = req.params.id

    const {
        idRol,
        idUsuario,
        estado
    } = req.body

    const data = {
        idRol,
        idUsuario,
        estado
    }

    try {
        const rolUsuario = await rolUsuarioService.updateRolUsuario(data, id)
        return res.status(200).json(rolUsuario)
    } catch (error) {
        next(error)
    }

}

const deleteRolUsuario = async (req, res, next) => {
    const id = req.params.id
    try {
        const rolUsuario = await rolUsuarioService.deleteRolUsuario(id)
        return res.status(200).json(rolUsuario)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllRolUsuario,
    getRolUsuarioById,
    createRolUsuario,
    updateRolUsuario,
    deleteRolUsuario
}