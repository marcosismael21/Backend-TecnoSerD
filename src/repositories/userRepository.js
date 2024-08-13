const db = require('../models');
const User = db.user;

//funciones para la creacion de usuarios

const getAllUser = async () => {
    try {
        const user = await User.findAll();
        return user;
    } catch (error) {
        throw error;
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

const login = async (nombre) => {
    try {
        const user = await User.findOne({
            where: {
                nombre: nombre,
            }
        });
        return user;
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
}