const comercioRepository = require('../repositories/comercioRepository')

const getAllComercio = async () => {
    try {
        const comercio = await comercioRepository.getAllComercio()
        return (comercio) ? comercio : []
    } catch (error) {
        throw error
    }
}

const getComercioById = async (id) => {
    try {
        const comercio = await comercioRepository.getComercioById(id)
        return (comercio) ? comercio : []
    } catch (error) {
        throw error
    }
}

const createComercio = async (data) => {
    try {
        const comercio = await comercioRepository.createComercio(data)
        return (comercio) ? comercio : []
    } catch (error) {
        throw error
    }
}

const updateComercio = async (data, id) => {
    try {
        const comercio = await comercioRepository.updateComercio(data, id)
        return (comercio) ? comercio : []
    } catch (error) {
        throw error
    }
}

const deleteComercio = async (id) => {
    try {
        const comercio = await comercioRepository.deleteComercio(id)
        return (comercio) ? comercio : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllComercio,
    getComercioById,
    createComercio,
    updateComercio,
    deleteComercio,
}