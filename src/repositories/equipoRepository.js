const db = require('../models')
const Equipo = db.Equipo

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction
} = require('sequelize');

const getAllEquipo = async () => {
    try {
       /* const equipo = await Equipo.findAll()
        return equipo*/
        const q = `SELECT
	                    e.*,
                        te.nombre as idTipoEquipo
                       FROM
                        equipos AS e
                        LEFT JOIN tipoequipos AS te ON te.id = e.idTipoEquipo;`

        const equipo = await sequelize.query(q, {
            type: QueryTypes.SELECT
        })
        return equipo
    } catch (error) {
        throw error
    }
}

const getEquipoByEstado = async (estado) => {
    try {

        const q = `SELECT
	                    e.*,
                        te.nombre as idTipoEquipo
                       FROM
                        equipos AS e
                        LEFT JOIN tipoequipos AS te ON te.id = e.idTipoEquipo
                        WHERE e.estado = :xestado AND e.comodin = false`

        const equipo = await sequelize.query(q, {
            replacements: {
                xestado: estado
            },
            type: QueryTypes.SELECT
        })

        /*const equipo = await Equipo.findAll({
            where: {
                estado: estado,
                comodin: false
            }
        })*/
        return equipo
    } catch (error) {
        throw error
    }
}

const getEquipoByComodin = async (comodin) => {
    try {
        const equipo = await Equipo.findAll({
            where: {
                comodin: comodin,
                estado: true
            }
        })
        return equipo
    } catch (error) {
        throw error
    }
}

const getEquipoById = async (id) => {
    try {
        const equipo = await Equipo.findOne({
            where: {
                id: id
            }
        })
        return equipo
    } catch (error) {
        throw error
    }
}

const createEquipo = async (data) => {
    try {
        const equipo = await Equipo.create(data)
        return equipo
    } catch (error) {
        throw error
    }
}

const updateEquipo = async (data, id) => {
    try {
        const equipo = await Equipo.update(data, {
            where: {
                id: id
            }
        })
        return equipo
    } catch (error) {
        throw error
    }
}

const deleteEquipo = async (id) => {
    try {
        const equipo = await Equipo.destroy({
            where: {
                id: id
            }
        })
        return equipo
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllEquipo,
    getEquipoById,
    createEquipo,
    updateEquipo,
    deleteEquipo,
    getEquipoByEstado,
    getEquipoByComodin
}