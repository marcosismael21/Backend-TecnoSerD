const agenteService = require('../services/agenteService')

const getAllAgente = async (req, res, next) => {
    try {
        const agente = await agenteService.getAllAgente()
        return res.status(200).json(agente)
    } catch (error) {
        next(error)
    }
}

const getAgenteById = async (req, res, next) => {
    const id = req.params.id
    try {
        const agente = await agenteService.getAgenteById(id)
        return res.status(200).json(agente)
    } catch (error) {
        next(error)
    }
}

const createAgente = async (req, res, next) => {
    const {
        nombre,
        estado
    } = req.body

    const data = {
        nombre,
        estado
    }

    try {
        const agente = await agenteService.createAgente(data)
        return res.status(200).json(agente)
    } catch (error) {
        next(error)
    }
}

const updateAgente = async (req, res, next) => {
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
        const agente = await agenteService.updateAgente(data, id)
        return res.status(200).json(agente)
    } catch (error) {
        next(error)
    }
}

const deleteAgente = async (req, res, next) => {
    const id = req.params.id
    try {
        const agente = await agenteService.deleteAgente(id)
        return res.status(200).json(agente)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllAgente,
    getAgenteById,
    createAgente,
    updateAgente,
    deleteAgente
}