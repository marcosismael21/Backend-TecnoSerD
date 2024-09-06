const db = require('../models')
const RolUsuario = db.RolUsuario

const getAllRolUsuario = async () => {
    try {
        const rolUsuario = await RolUsuario.findAll()
        return rolUsuario
    } catch (error) {
        throw error
    }
}

const getRolUsuarioById = async (id) => {
    try {
        const rolUsuario = await RolUsuario.findOne({
            where: {
                id: id
            }
        })
        return rolUsuario
    } catch (error) {
        throw error
    }
}

const createRolUsuario = async (data) => {
    try {
        const rolUsuario = await RolUsuario.create(data)
        return rolUsuario
    } catch (error) {
        throw error
    }
}

const updateRolUsuario = async (data, id) => {
    try {
        const rolUsuario = await RolUsuario.update(data, {
            where: {
                id: id
            }
        })
        return rolUsuario
    } catch (error) {
        throw error
    }
}

const deleteRolUsuario = async (id) => {
    try {
        const rolUsuario = await RolUsuario.destroy({
            where: {
                id: id
            }
        })
        return rolUsuario
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllRolUsuario,
    getRolUsuarioById,
    createRolUsuario,
    updateRolUsuario,
    deleteRolUsuario
}