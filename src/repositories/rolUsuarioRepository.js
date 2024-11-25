const db = require('../models')
const RolUsuario = db.RolUsuario

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction
} = require('sequelize');
const getAllRolUsuario = async () => {
    try {
        const ru= `SELECT 
    ru.*, 
    u.nombres AS idUsuario, 
    r.nombre AS idRol
FROM 
    rolusuarios ru
JOIN 
    usuarios u ON ru.idUsuario = u.id
JOIN 
    rols r ON ru.idRol = r.id;`
    const rolUsuario = await sequelize.query(ru, {
        type: QueryTypes.SELECT
    })
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