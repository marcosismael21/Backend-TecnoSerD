const db = require('../models')
const { Op } = require('sequelize')
const TipoComercio = db.TipoComercio
const Publicidad_Regalia = db.PublicidadRegalia

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction,
    where
} = require('sequelize');

const getAllPublicidad_Regalia = async () => {
    try {

        const q = `SELECT
	                p.*,
	                tc.nombre AS idTipoComercio,
                    CONCAT(p.nombre, ' - ', tc.nombre) AS nombrePublicidadRegalia
                    FROM
	                publicidadregalia AS p
	                LEFT JOIN tipocomercios AS tc ON tc.id = p.idTipoComercio`

        const publicidad_regalia = await sequelize.query(q, {
            type: QueryTypes.SELECT
        })
        return publicidad_regalia;
    } catch (error) {
        throw error
    }
}

const getPublicidad_RegaliaById = async (id) => {
    try {
        const publicidad_regalia = await Publicidad_Regalia.findOne({
            where: {
                id: id,
            }
        })
        return publicidad_regalia;
    } catch (error) {
        throw error
    }
}

const createPublicidad_Regalia = async (data) => {
    try {
        const publicidad_regalia = await Publicidad_Regalia.create(data)
        return publicidad_regalia
    } catch (error) {
        throw error
    }
}

const updatePublicidad_Regalia = async (data, id) => {
    try {
        const publicidad_regalia = await Publicidad_Regalia.update(data, {
            where: {
                id: id
            }
        })
        return publicidad_regalia
    } catch (error) {
        throw error
    }
}

const deletePublicidad_Regalia = async (id) => {
    try {
        const publicidad_regalia = await Publicidad_Regalia.destroy({
            where: {
                id: id
            }
        })
        return publicidad_regalia
    } catch (error) {
        throw error
    }
}

const getPublicidad = async () => {
    try {

        const sql = `
                SELECT
	                p.*,
	                tc.nombre AS idTipoComercio,
	                CONCAT( p.nombre, ' - ', tc.nombre ) AS nombrePublicidadRegalia 
                FROM
	                publicidadregalia AS p
	                LEFT JOIN tipocomercios AS tc ON tc.id = p.idTipoComercio 
                WHERE
	                p.cantidad > 0 
	                AND p.estado = 1`

        const publicidad_regalia = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })

        return publicidad_regalia
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPublicidad_Regalia,
    getPublicidad_RegaliaById,
    createPublicidad_Regalia,
    updatePublicidad_Regalia,
    deletePublicidad_Regalia,
    getPublicidad
}