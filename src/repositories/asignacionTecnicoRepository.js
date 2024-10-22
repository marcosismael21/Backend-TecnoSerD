const db = require('../models')
const AsignacionTecnico = db.AsignacionTecnico

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction
} = require('sequelize');

const getAllAsignacionTecnico = async () => {
    try {
        const ru= `SELECT 
    at.*, 
    u.nombres AS idUsuario, 
    c.nombreComercio AS idComercio, 
    s.nombre AS idServicio, 
    e.idTipoEquipo AS idEquipo,
    te.nombre AS tipoEquipo,
    est.nombre AS idEstado
FROM 
    asignaciontecnicos at
JOIN 
    usuarios u ON at.idUsuario = u.id
JOIN 
    asignacions a ON at.idAsignacion = a.id
JOIN 
    comercios c ON a.idComercio = c.id
JOIN 
    servicios s ON a.idServicio = s.id
JOIN 
    equipos e ON a.idEquipo = e.id
JOIN 
    tipoequipos te ON e.idTipoEquipo = te.id
JOIN 
    estados est ON at.idEstado = est.id;`
    const asignacionTecnico = await sequelize.query(ru, {
        type: QueryTypes.SELECT
    })
    return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const getAsignacionTecnicoById = async (id) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.findOne({
            where: {
                id: id
            }
        })
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const createAsignacionTecnico = async (data) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.create(data)
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const updateAsignacionTecnico = async (data, id) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.update(data, {
            where: {
                id: id
            }
        })
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const deleteAsignacionTecnico = async (id) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.destroy({
            where: {
                id: id
            }
        })
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllAsignacionTecnico,
    getAsignacionTecnicoById,
    createAsignacionTecnico,
    updateAsignacionTecnico,
    deleteAsignacionTecnico
}