const db = require('../models')
const TipoEquipo = db.TipoEquipo

const {
    sequelize
} = require("../models");
const {
    QueryTypes
} = require('sequelize');

const getAllTipoEquipo = async () => {
    try {
        const sql = `
        SELECT
	te.*,
	pr.nombre AS idProveedor 
FROM
	tipoequipos te
	LEFT JOIN proveedors AS pr ON pr.id = te.idProveedor
        `

        const tipoEquipo = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })
        return tipoEquipo
    } catch (error) {
        throw error
    }
}

const getTipoEquipoById = async (id) => {
    try {
        const tipoEquipo = await TipoEquipo.findOne({
            where: {
                id: id
            }
        })
        return tipoEquipo
    } catch (error) {
        throw error
    }
}

const createTipoEquipo = async (data) => {
    try {
        const tipoEquipo = await TipoEquipo.create(data)
        return tipoEquipo
    } catch (error) {
        throw error
    }
}

const updateTipoEquipo = async (data, id) => {
    try {
        const tipoEquipo = await TipoEquipo.update(data, {
            where: {
                id: id
            }
        })
        return tipoEquipo
    } catch (error) {
        throw error
    }
}

const deleteTipoEquipo = async (id) => {
    try {
        const tipoEquipo = await TipoEquipo.destroy({
            where: {
                id: id
            }
        })
        return tipoEquipo
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoEquipo,
    getTipoEquipoById,
    createTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo
}