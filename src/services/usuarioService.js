const userRepository = require('../repositories/usuarioRepository');
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

const getAllUsersFalse = async (estado) => {
    try {
        const user = await userRepository.getAllUsersFalse(estado)
        return (user) ? user : []
    } catch (error) {
        throw error
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
        const { usuario } = data;

        // Verificar si el nombre de usuario ya existe
        const existingUser = await userRepository.login(usuario);

        if (existingUser) {
            // Si el usuario ya existe, retornar un mensaje o lanzar un error
            return { success: false, message: "El nombre de usuario ya existe" };
        }
        
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
            usuario,
            pass,
        } = data

        const user = await userRepository.login(usuario)

        if (user) {
            const isSame = await bcryp.compare(pass, user.pass)
            if (isSame) {

                const { token, expiresIn } = generateToken(user.id)

                let userData = {
                    id: user.id,
                    nombres: user.nombres,
                    usuario: user.usuario,
                    idrol: user.idrol
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
    getAllUsersFalse
}