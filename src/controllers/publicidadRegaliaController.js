const publicidadRegaliaService = require('../services/publicidadRegaliaService')

const getAllPublicidad_Regalia = async (req, res, next) => {
    try {
        const publicidad_regalia = await publicidadRegaliaService.getAllPublicidad_Regalia()
        return res.status(200).json(publicidad_regalia)
    } catch (error) {
        next(error)
    }
}

const getPublicidad_RegaliaById = async (req, res, next) => {
    const id = req.params.id
    try {
        const publicidad_regalia = await publicidadRegaliaService.getPublicidad_RegaliaById(id)
        return res.status(200).json(publicidad_regalia)
    } catch (error) {
        next(error)
    }
}

const createPublicidad_Regalia = async (req, res, next) => {
    const {
        nombre,
        idTipoComercio,
        cantidad,
        estado
    } = req.body

    const data = {
        nombre,
        idTipoComercio,
        cantidad,
        estado
    }

    try {
        const publicidad_regalia = await publicidadRegaliaService.createPublicidad_Regalia(data)
        return res.status(200).json({ publicidad_regalia, message: 'Se creo correctamente.' })
    } catch (error) {
        next(error)
    }
}

const updatePublicidad_Regalia = async (req, res, next) => {
    const id = req.params.id
    const {
        nombre,
        idTipoComercio,
        cantidad,
        estado
    } = req.body

    const data = {
        nombre,
        idTipoComercio,
        cantidad,
        estado
    }

    try {
        const publicidad_regalia = await publicidadRegaliaService.updatePublicidad_Regalia(data, id)
        return res.status(200).json({publicidad_regalia, message: 'Se actualizo correctamente.'})
    } catch (error) {
        next(error)
    }
}


const deletePublicidad_Regalia = async (req, res, next) => {
    const id = req.params.id
    try {
        const publicidad_regalia = await publicidadRegaliaService.deletePublicidad_Regalia(id)
        return res.status(200).json({publicidad_regalia, message: 'Se elimino correctamente.'})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPublicidad_Regalia,
    getPublicidad_RegaliaById,
    createPublicidad_Regalia,
    updatePublicidad_Regalia,
    deletePublicidad_Regalia,
}