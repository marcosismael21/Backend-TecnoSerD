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

const getEquipoSinAsignar = async () => {
    try {
        const sql = `
        SELECT
            eq.*,
            CASE 
                WHEN eq.idTipoEquipo IN (9, 10) THEN CONCAT(te.nombre, ' pin:', eq.pin, ' puk:', eq.puk)
                ELSE CONCAT(te.nombre, ' NS:', eq.noserie)
            END AS idTipoEquipo
        FROM
            equipos AS eq
            LEFT JOIN tipoequipos AS te ON te.id = eq.idTipoEquipo
            LEFT JOIN asignacions AS asig ON eq.id = asig.idEquipo 
        WHERE
            asig.idEquipo IS NULL;`

        const equipo = await sequelize.query(sql, {
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

        return equipo
    } catch (error) {
        throw error
    }
}

const getEquipoByComodin = async (comodin) => {
    try {
        const q = `SELECT
	                    e.*,
                        te.nombre as idTipoEquipo
                       FROM
                        equipos AS e
                        LEFT JOIN tipoequipos AS te ON te.id = e.idTipoEquipo
                        WHERE e.comodin  = :xcomodin`

        const equipo = await sequelize.query(q, {
            replacements: {
                xcomodin: comodin
            },
            type: QueryTypes.SELECT
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
    getEquipoByComodin,
    getEquipoSinAsignar
}