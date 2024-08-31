const agenteRepository = require('../repositories/agenteRepository')

const getAllAgente = async () => {
    try {
        const agente = await agenteRepository.getAllAgente()
        return (agente)? agente : []
    } catch (error) {
        throw error
    }
}

const getAgenteById = async (id) => {
    try {
        const agente = await agenteRepository.getAgenteById(id)
        return (agente)? agente : []
    } catch (error) {
        throw error
    }
}

const createAgente = async (data) => {
    try {
        const agente = await agenteRepository.createAgente(data)
        return (agente)? agente : []
    } catch (error) {
        throw error
    }
}

const updateAgente = async (data, id) => {
    try {
        const agente = await agenteRepository.updateAgente(data, id)
        return (agente)? agente : []
    } catch (error) {
        throw error
    }
}

const deleteAgente = async (id) => {
    try {
        const agente = await agenteRepository.deleteAgente(id)
        return (agente)? agente : []
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