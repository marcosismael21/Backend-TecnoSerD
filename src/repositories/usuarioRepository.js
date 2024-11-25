const db = require('../models');
const User = db.Usuario;

const {
    sequelize
} = require("../models");
const {
    QueryTypes
} = require('sequelize');

const getAllUser = async () => {
    try {
        const user = await User.findAll();
        return user;
    } catch (error) {
        throw error;
    }
}

const getAllUsersStatus = async (estado) => {
    try {
        const sql = `
        SELECT
	us.*,
	r.nombre as idrol
FROM
	usuarios AS us 
	LEFT JOIN
	rols AS r ON r.id = us.idrol
WHERE
	us.estado = :xestado
        `
        const user = await sequelize.query(sql, {
            replacements: {
                xestado: estado
            },
            type: QueryTypes.SELECT
        })
        return user
    } catch (error) {
        throw error
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                id: id,
            }
        });
        return user;
    } catch (error) {
        throw error;
    }
}

const createUser = async (data) => {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (data, id) => {
    try {
        const user = await User.update(data, {
            where: {
                id: id,
            }
        });
        return user;
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        const user = await User.destroy({
            where: {
                id: id,
            }
        });
        return user;
    } catch (error) {
        throw error;
    }

}

//funciones para login

const login = async (usuario) => {
    try {
        const user = await User.findOne({
            where: {
                usuario: usuario,
                estado: 1,
            }
        });
        return user;
    } catch (error) {
        throw error;
    }
}

const getAllUserByRol = async () => {
    try {
        const user = await User.findAll({
            where: {
                idrol: 2,
                estado: 1
            }
        })
        return user
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    getAllUsersStatus,
    getAllUserByRol,
}