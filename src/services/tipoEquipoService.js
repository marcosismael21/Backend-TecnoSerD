const tipoEquipoRepository = require('../repositories/tipoEquipoRepository')

const getAllTipoEquipo = async () => {
    try {
        const tipoEquipo = await tipoEquipoRepository.getAllTipoEquipo()
        return (tipoEquipo) ? tipoEquipo : []
    } catch (error) {
        throw error
    }
}

const getTipoEquipoById = async (id) => {
    try {
        const tipoEquipo = await tipoEquipoRepository.getTipoEquipoById(id)
        return (tipoEquipo) ? tipoEquipo : []
    } catch (error) {
        throw error
    }
}

const createTipoEquipo = async (data) => {
    try {
        const tipoEquipo = await tipoEquipoRepository.createTipoEquipo(data)
        return (tipoEquipo) ? tipoEquipo : []
    } catch (error) {
        throw error
    }
}

const updateTipoEquipo = async (data, id) => {
    try {
        const tipoEquipo = await tipoEquipoRepository.updateTipoEquipo(data, id)
        return (tipoEquipo) ? tipoEquipo : []
    } catch (error) {
        throw error
    }
}

const deleteTipoEquipo = async (id) => {
    try {
        const tipoEquipo = await tipoEquipoRepository.deleteTipoEquipo(id)
        return (tipoEquipo) ? tipoEquipo : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoEquipo,
    getTipoEquipoById,
    createTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo,
}