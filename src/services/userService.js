const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/tokenManager');
const bcryp = require("bcrypt");

const getAllUser = async () => {
    try {
        const user = await userRepository.getAllUser();
        return (user) ? user : [];
    } catch (error) {
        throw error;
    }

}

const getUserById = async (id) => {
    try {
        const user = await userRepository.getUserById(id,);
        return (user) ? user : [];
    } catch (error) {
        throw error;
    }

}

const createUser = async (data) => {
    try {
        const user = await userRepository.createUser(data);
        return (user) ? user : [];
    } catch (error) {
        throw error;
    }

}

const updateUser = async (data, id) => {
    try {
        const user = await userRepository.updateUser(data, id);
        return (user) ? user : [];
    } catch (error) {
        throw error;
    }

}

const deleteUser = async (id) => {
    try {
        const user = await userRepository.deleteUser(id);
        return (user) ? user : [];
    } catch (error) {
        throw error;
    }

}

//funcion para login

const login = async (data, res) => {
    try {
        const {
            nombre,
            pass
        } = data

        const user = await userRepository.login(nombre)

        if (user) {
            const isSame = await bcryp.compare(pass, user.pass)
            if (isSame) {
                const { token, expiresIn } = generateToken(user.id)
                let userData = {
                    nombre: nombre,
                }
                const authenticated = true;
                return {
                    authenticated,
                    userData,
                    token,
                    expiresIn
                }
            }
            return "Authentication failed";
        } else {
            return "Authentication failed";
        }

    } catch (error) {
        throw error
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