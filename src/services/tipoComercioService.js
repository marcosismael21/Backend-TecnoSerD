const tipoComercioRepository = require('../repositories/tipoComercioRepository')

const getAllTipoComercio = async () => {
    try {
        const tipoComercio = await tipoComercioRepository.getAllTipoComercio()
        return (tipoComercio)? tipoComercio : []
    } catch (error) {
        throw error
    }
}

const getTipoComercioById = async (id) => {
    try {
        const tipoComercio = await tipoComercioRepository.getTipoComercioById(id)
        return (tipoComercio)? tipoComercio : []
    } catch (error) {
        throw error
    }
}

const createTipoComercio = async (data) => {
    try {
        const tipoComercio = await tipoComercioRepository.createTipoComercio(data)
        return (tipoComercio)? tipoComercio : []
    } catch (error) {
        throw error
    }
}

const updateTipoComercio = async (data, id) => {
    try {
        const tipoComercio = await tipoComercioRepository.updateTipoComercio(data, id)
        return (tipoComercio)? tipoComercio : []
    } catch (error) {
        throw error
    }
}

const deleteTipoComercio = async (id) => {
    try {
        const tipoComercio = await tipoComercioRepository.deleteTipoComercio(id)
        return (tipoComercio)? tipoComercio : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoComercio,
    getTipoComercioById,
    createTipoComercio,
    updateTipoComercio,
    deleteTipoComercio,
}