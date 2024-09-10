const estadoRepository = require('../repositories/estadoRepository')

const getAllEstado = async () => {
    try {
        const estado = await estadoRepository.getAllEstado()
        return (estado) ? estado : []
    } catch (error) {
        throw error
    }
}

const getEstadoById = async (id) => {
    try {
        const estado = await estadoRepository.getEstadoById(id)
        return (estado) ? estado : []
    } catch (error) {
        throw error
    }
}

const createEstado = async (data) => {
    try {
        const estado = await estadoRepository.createEstado(data)
        return (estado) ? estado : []
    } catch (error) {
        throw error
    }
}

const updateEstado = async (data, id) => {
    try {
        const estado = await estadoRepository.updateEstado(data, id)
        return (estado) ? estado : []
    } catch (error) {
        throw error
    }
}

const deleteEstado = async (id) => {
    try {
        const estado = await estadoRepository.deleteEstado(id)
        return (estado) ? estado : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllEstado,
    getEstadoById,
    createEstado,
    updateEstado,
    deleteEstado,
}