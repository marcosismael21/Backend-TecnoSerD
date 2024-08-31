const db = require('../models')
const Rol = db.Rol

const getAllRol = async () => {
    try {
        const rol = await Rol.findAll()
        return rol
    } catch (error) {
        throw error
    }
}

const getRolById = async (id) => {
    try {
        const rol = await Rol.findOne({
            where: {
                id: id
            }
        })
        return rol
    } catch (error) {
        throw error
    }
}

const createRol = async (data) => {
    try {
        const rol = await Rol.create(data)
        return rol
    } catch (error) {
        throw error
    }
}

const updateRol = async (data, id) => {
    try {
        const rol = await Rol.update(data, {
            where: {
                id: id
            }
        })
        return rol
    } catch (error) {
        throw error
    }
}

const deleteRol = async (id) => {
    try {
        const rol = await Rol.destroy({
            where: {
                id: id
            }
        })
        return rol
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllRol,
    getRolById,
    createRol,
    updateRol,
    deleteRol
}