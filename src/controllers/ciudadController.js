const ciudadService = require('../services/ciudadService')

const getAllCiudad = async (req, res, next) => {
    try {
        const proveedor = await ciudadService.getAllCiudad()
        return res.status(200).json(proveedor)
    } catch (error) {
        next(error)
    }
}

const getCiudadById = async (req, res, next) => {
    const id = req.params.id
    try {
        const proveedor = await ciudadService.getCiudadById(id)
        return res.status(200).json(proveedor)
    } catch (error) {
        next(error)
    }
}

const createCiudad = async (req, res, next) => {
    const {
        nombre,
        estado
    } = req.body

    const data = {
        nombre,
        estado
    }

    try {
        const proveedor = await ciudadService.createCiudad(data)
        return res.status(200).json({proveedor, message: 'Se creo correctamente.'})
    } catch (error) {
        next(error)
    }
}

const updateCiudad = async (req, res, next) => {
    const id = req.params.id

    const {
        nombre,
        estado
    } = req.body

    const data = {
        nombre,
        estado
    }

    try {
        const proveedor = await ciudadService.updateCiudad(data, id)
        return res.status(200).json({proveedor, message: 'Se actualizo correctamente.'})
    } catch (error) {
        next(error)
    }
}

const deleteCiudad = async (req, res, next) => {
    const id = req.params.id
    try {
        const proveedor = await ciudadService.deleteCiudad(id)
        return res.status(200).json({proveedor, message: 'Se elimino correctamente.'})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCiudad,
    getCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad
}