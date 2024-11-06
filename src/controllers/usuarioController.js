const userService = require('../services/usuarioService.js');
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/tokenManager.js");
const bcryp = require("bcrypt");

const getAllUser = async (req, res, next) => {
    try {
        const user = await userService.getAllUser();
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const getAllUsersStatus = async (req, res, next) => {
    const estado = req.params.estado
    try {
        const user = await userService.getAllUsersStatus(estado)
        return res.status(200).json(user)
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    const {
        nombres,
        usuario,
        pass,
        idrol,
        estado
    } = req.body;

    const data = {
        nombres,
        usuario,
        pass: await bcryp.hash(pass, 10),
        idrol,
        estado
    }

    try {
        const user = await userService.createUser(data);
        return res.status(200).json({user, message:'Se creo correctamente.'});
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    const id = req.params.id;

    const {
        nombres,
        usuario,
        pass,
        idrol,
        estado
    } = req.body;

    const data = {
        nombres,
        usuario,
        pass: await bcryp.hash(pass, 10),
        idrol,
        estado
    }

    try {
        const user = await userService.updateUser(data, id);
        return res.status(200).json({user, message:'Se actualizo correctamente.'});
    } catch (error) {
        next(error);
    }
}

const changeStatusTrue = async (req, res, next) => {
    const id = req.params.id;
    const {
        estado
    } = req.body;

    const data = {
        estado
    }

    try {
        const user = await userService.updateUser(data, id);
        return res.status(200).json({user, message:'Se actualizo corectamente'});
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await userService.deleteUser(id);
        return res.status(200).json({user, message: 'Se elimino correctamente.'});
    } catch (error) {
        next(error);
    }
}

//funcion de login

const login = async (req, res, next) => {
    try {
        const {
            usuario,
            pass
        } = req.body

        const data = {
            usuario,
            pass
        }

        const {
            authenticated,
            userData,
            token,
            expiresIn
        } = await userService.login(data, res)

        if (authenticated) {

            // Establecer la cookie con el token JWT
            res.cookie("token", token, {
                httpOnly: true, // Para prevenir acceso al token desde JavaScript del cliente
                secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
                maxAge: expiresIn * 1000, // Duración en milisegundos
            });

            return res.status(200).json({
                ok: true,
                userData: userData,
                mensage: "Usuario correcto",
                authenticated,
                token,
                expiresIn
            })
        }

        return res.status(200).send({
            ok: false,
            data: null,
            authenticated,
            mensage: "Usuario o clave incorrectos"
        })

    } catch (error) {
        res.status(500).send('Error al intentar iniciar sesion:' + error)
        next(error)
    }

}

const logout = async (req, res, next) => {
    try {
        // Eliminar la cookie con el token JWT
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
        });

        res.clearCookie("userData", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
        });

        return res.status(200).json({
            ok: true,
            mensage: "Logout exitoso"
        });
    } catch (error) {
        res.status(500).send('Error al intentar cerrar sesión: ' + error);
        next(error);
    }
}

const getAllUserByRol = async (req, res, next) => {
    try {
        const user = await userService.getAllUserByRol()
        return res.status(200).json(user)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    changeStatusTrue,
    getAllUsersStatus,
    logout,
    getAllUserByRol,
}