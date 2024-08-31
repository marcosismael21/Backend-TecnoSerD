const servicioRepository = require('../repositories/servicioRepository')

const getAllServicio = async () => {
    try {
        const servicio = await servicioRepository.getAllServicio()
        return (servicio) ? servicio : []
    } catch (error) {
        throw error
    }
}

const getServicioById = async (id) => {
    try {
        const servicio = await servicioRepository.getServicioById(id)
        return (servicio) ? servicio : []
    } catch (error) {
        throw error
    }
}

const createServicio = async (data) => {
    try {
        const servicio = await servicioRepository.createServicio(data)
        return (servicio) ? servicio : []
    } catch (error) {
        throw error
    }
}

const updateServicio = async (data, id) => {
    try {
        const servicio = await servicioRepository.updateServicio(data, id)
        return (servicio) ? servicio : []
    } catch (error) {
        throw error
    }
}

const deleteServicio = async (id) => {
    try {
        const servicio = await servicioRepository.deleteServicio(id)
        return (servicio) ? servicio : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllServicio,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio,
}