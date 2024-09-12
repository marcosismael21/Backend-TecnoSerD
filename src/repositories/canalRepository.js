const db = require("../models");
const Canal = db.Canal;

const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const getAllCanal = async () => {
    try {
        const sql = `SELECT ca.*, tc.nombre as idTipoComercio
                    FROM canals AS ca
                    LEFT JOIN tipocomercios AS tc ON tc.id=ca.idTipoComercio;`;
        const canal = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
        })
        return canal;
    } catch (error) {
        throw error;
    }
};

const getCanalById = async (id) => {
    try {
        const canal = await Canal.findOne({
            where: {
                id: id,
            },
        });
        return canal;
    } catch (error) {
        throw error;
    }
};

const createCanal = async (data) => {
    try {
        const canal = await Canal.create(data);
        return canal;
    } catch (error) {
        throw error;
    }
};

const updateCanal = async (data, id) => {
    try {
        const canal = await Canal.update(data, {
            where: {
                id: id,
            },
        });
        return canal;
    } catch (error) {
        throw error;
    }
};

const deleteCanal = async (id) => {
    try {
        const canal = await Canal.destroy({
            where: {
                id: id,
            },
        });
        return canal;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllCanal,
    getCanalById,
    createCanal,
    updateCanal,
    deleteCanal,
};
