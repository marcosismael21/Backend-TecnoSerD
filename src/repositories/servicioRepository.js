const db = require('../models');
const Servicio = db.Servicio;

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction
} = require('sequelize');

const getAllServicio = async () => {
    try {
        const servicio = await Servicio.findAll();
        return servicio;
    } catch (error) {
        throw error;
    }
}

const getServicioById = async (id) => {
    try {
        const servicio = await Servicio.findOne({
            where: {
                id: id,
            }
        });
        return servicio;
    } catch (error) {
        throw error;
    }
}

const createServicio = async (data) => {
    try {
        const servicio = await Servicio.create(data);
        return servicio;
    } catch (error) {
        throw error;
    }
}

const updateServicio = async (data, id) => {
    try {
        const servicio = await Servicio.update(data, {
            where: {
                id: id,
            }
        });
        return servicio;
    } catch (error) {
        throw error;
    }
}

const deleteServicio = async (id) => {
    try {
        const servicio = await Servicio.destroy({
            where: {
                id: id,
            }
        });
        return servicio;
    } catch (error) {
        throw error;
    }

}

const getServicioCanal = async () => {
    try {
        const sql = `SELECT s.*, CONCAT(s.nombre,' ',c.nombre) AS nombre FROM servicios AS s LEFT JOIN canals AS c ON c.id = s.idcanal`

        const servicio = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })
        return servicio
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllServicio,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio,
    getServicioCanal,
}