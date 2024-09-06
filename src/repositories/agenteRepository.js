const db = require('../models')
const Agente = db.Agente

const getAllAgente = async () => {
    try {
        const agente = await Agente.findAll()
        return agente
    } catch (error) {
        throw error
    }
}

const getAgenteById = async (id) => {
    try {
        const agente = await Agente.findOne({
            where: {
                id: id
            }
        })
        return agente
    } catch (error) {
        throw error
    }
}

const createAgente = async (data) => {
    try {
        const agente = await Agente.create(data)
        return agente
    } catch (error) {
        throw error
    }
}

const updateAgente = async (data, id) => {
    try {
        const agente = await Agente.update(data, {
            where: {
                id: id
            }
        })
        return agente
    } catch (error) {
        throw error
    }
}

const deleteAgente = async (id) => {
    try {
        const agente = await Agente.destroy({
            where: {
                id: id
            }
        })
        return agente
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllAgente,
    getAgenteById,
    createAgente,
    updateAgente,
    deleteAgente
}