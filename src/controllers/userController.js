const userService = require('../services/userService');
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
        nombre,
        pass,
    } = req.body;

    const data = {
        nombre,
        pass: await bcryp.hash(pass, 10),
    }

    try {
        const user = await userService.createUser(data);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    const id = req.params.id;

    const {
        nombre,
        pass,
    } = req.body;

    const data = {
        nombre,
        pass,
    }

    try {
        const user = await userService.updateUser(data, id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await userService.deleteUser(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

//funcion de login

const login = async (req, res, next) => {
    try {
        const {
            nombre,
            pass
        } = req.body

        const data = {
            nombre,
            pass
        }

        const {
            authenticated,
            userData,
            token,
            expiresIn
        } = await userService.login(data, res)

        if (authenticated) {
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
            mensaje: "Usuario o clave incorrectos"
        })

    } catch (error) {
        res.status(500).send('Error al intentar iniciar sesion:' + error)
        next(error)
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