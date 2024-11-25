const db = require('../models')
const Comercio = db.Comercio

const {
    sequelize
} = require("../models");
const {
    QueryTypes
} = require('sequelize');

const getAllComercio = async () => {
    try {
        const sql = "SELECT co.*, ci.nombre AS idCiudad, tc.nombre AS idTipoComercio FROM comercios AS co LEFT JOIN ciudads AS ci ON ci.id = co.idCiudad LEFT JOIN tipocomercios AS tc ON tc.id = co.idTipoComercio"
        const comercio = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })
        return comercio
    } catch (error) {
        throw error
    }
}

const getComercioById = async (id) => {
    try {
        const comercio = await Comercio.findOne({
            where: {
                id: id
            }
        })
        return comercio
    } catch (error) {
        throw error
    }
}

const createComercio = async (data) => {
    try {
        const comercio = await Comercio.create(data)
        return comercio
    } catch (error) {
        throw error
    }
}

const updateComercio = async (data, id) => {
    try {
        const comercio = await Comercio.update(data, {
            where: {
                id: id
            }
        })
        return comercio
    } catch (error) {
        throw error
    }
}

const deleteComercio = async (id) => {
    try {
        const comercio = await Comercio.destroy({
            where: {
                id: id
            }
        })
        return comercio
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllComercio,
    getComercioById,
    createComercio,
    updateComercio,
    deleteComercio
}