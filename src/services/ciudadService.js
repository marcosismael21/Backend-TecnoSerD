const ciudadRepository = require('../repositories/ciudadRepository')

const getAllCiudad = async () => {
    try {
        const ciudad = await ciudadRepository.getAllCiudad()
        return (ciudad) ? ciudad : []
    } catch (error) {
        throw error
    }
}

const getCiudadById = async (id) => {
    try {
        const ciudad = await ciudadRepository.getCiudadById(id)
        return (ciudad) ? ciudad : []
    } catch (error) {
        throw error
    }
}

const createCiudad = async (data) => {
    try {
        const ciudad = await ciudadRepository.createCiudad(data)
        return (ciudad) ? ciudad : []
    } catch (error) {
        throw error
    }
}

const updateCiudad = async (data, id) => {
    try {
        const ciudad = await ciudadRepository.updateCiudad(data, id)
        return (ciudad) ? ciudad : []
    } catch (error) {
        throw error
    }
}

const deleteCiudad = async (id) => {
    try {
        const ciudad = await ciudadRepository.deleteCiudad(id)
        return (ciudad) ? ciudad : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCiudad,
    getCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad,
}