const comercioService = require('../services/comercioService')

const getAllComercio = async (req, res, next) => {
    try {
        const comercio = await comercioService.getAllComercio()
        return res.status(200).json(comercio)
    } catch (error) {
        next(error)
    }
}

const getComercioById = async (req, res, next) => {
    const id = req.params.id
    try {
        const comercio = await comercioService.getComercioById(id)
        return res.status(200).json(comercio)
    } catch (error) {
        next(error)
    }
}

const createComercio = async (req, res, next) => {
    const {
        nombreComercio,
        rtn,
        direccion,
        numTienda,
        nombreContacto,
        telefono,
        numUsuario,
        idCiudad,
        longitud,
        latitud,
        idTipoComercio,
    } = req.body

    const data = {
        nombreComercio,
        rtn,
        direccion,
        numTienda,
        nombreContacto,
        telefono,
        numUsuario,
        idCiudad,
        longitud,
        latitud,
        idTipoComercio,
    }

    try {
        const comercio = await comercioService.createComercio(data)
        return res.status(200).json(comercio)
    } catch (error) {
        next(error)
    }
}

const updateComercio = async (req, res, next) => {
    const id = req.params.id

    const {
        nombreComercio,
        rtn,
        direccion,
        numTienda,
        nombreContacto,
        telefono,
        numUsuario,
        idCiudad,
        longitud,
        latitud,
        idTipoComercio,
    } = req.body

    const data = {
        nombreComercio,
        rtn,
        direccion,
        numTienda,
        nombreContacto,
        telefono,
        numUsuario,
        idCiudad,
        longitud,
        latitud,
        idTipoComercio,
    }

    try {
        const comercio = await comercioService.updateComercio(data, id)
        return res.status(200).json(comercio)
    } catch (error) {
        next(error)
    }
}

const deleteComercio = async (req, res, next) => {
    const id = req.params.id
    try {
        const comercio = await comercioService.deleteComercio(id)
        return res.status(200).json(comercio)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllComercio,
    getComercioById,
    createComercio,
    updateComercio,
    deleteComercio
}