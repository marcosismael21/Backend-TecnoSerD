const canalService = require('../services/canalService')

const getAllCanal = async (req, res, next) => {
    try {
        const canal = await canalService.getAllCanal()
        return res.status(200).json(canal)
    } catch (error) {
        next(error)
    }
}

const getCanalById = async (req, res, next) => {
    const id = req.params.id
    try {
        const canal = await canalService.getCanalById(id)
        return res.status(200).json(canal)
    } catch (error) {
        next(error)
    }
}

const createCanal = async (req, res, next) => {
    const {
        nombre,
        idTipoComercio,
        estado
    } = req.body

    const data = {
        nombre,
        idTipoComercio,
        estado
    }

    try {
        const canal = await canalService.createCanal(data)
        return res.status(200).json(canal)
    } catch (error) {
        next(error)
    }
}

const updateCanal = async (req, res, next) => {
    const id = req.params.id

    const {
        nombre,
        idTipoComercio,
        estado
    } = req.body

    const data = {
        nombre,
        idTipoComercio,
        estado
    }

    try {
        const canal = await canalService.updateCanal(data, id)
        return res.status(200).json(canal)
    } catch (error) {
        next(error)
    }
}

const deleteCanal = async (req, res, next) => {
    const id = req.params.id
    try {
        const canal = await canalService.deleteCanal(id)
        return res.status(200).json(canal)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCanal,
    getCanalById,
    createCanal,
    updateCanal,
    deleteCanal
}