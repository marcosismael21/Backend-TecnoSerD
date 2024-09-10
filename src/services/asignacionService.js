const asignacionRepository = require('../repositories/asignacionRepository')

const getAllAsignacion = async () => {
    try {
        const asignacion = await asignacionRepository.getAllAsignacion()
        return (asignacion) ? asignacion : []
    } catch (error) {
        throw error
    }
}

const getAsignacionById = async (id) => {
    try {
        const asignacion = await asignacionRepository.getAsignacionById(id)
        return (asignacion) ? asignacion : []
    } catch (error) {
        throw error
    }
}

const createAsignacion = async (data) => {
    try {
        const asignacion = await asignacionRepository.createAsignacion(data)
        return (asignacion) ? asignacion : []
    } catch (error) {
        throw error
    }
}

const updateAsignacion = async (data, id) => {
    try {
        const asignacion = await asignacionRepository.updateAsignacion(data, id)
        return (asignacion) ? asignacion : []
    } catch (error) {
        throw error
    }
}

const deleteAsignacion = async (id) => {
    try {
        const asignacion = await asignacionRepository.deleteAsignacion(id)
        return (asignacion) ? asignacion : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllAsignacion,
    getAsignacionById,
    createAsignacion,
    updateAsignacion,
    deleteAsignacion,
}