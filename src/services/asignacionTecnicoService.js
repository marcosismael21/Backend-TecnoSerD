const asignacionTecnicoRepository = require('../repositories/asignacionTecnicoRepository')

const getAllAsignacionTecnico = async () => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.getAllAsignacionTecnico()
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const getAsignacionTecnicoById = async (id) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.getAsignacionTecnicoById(id)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const createAsignacionTecnico = async (data) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.createAsignacionTecnico(data)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const updateAsignacionTecnico = async (data, id) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.updateAsignacionTecnico(data, id)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const deleteAsignacionTecnico = async (id) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.deleteAsignacionTecnico(id)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const createAsignacionTecnicoTransaction = async (idUsuario, idComercio, idEstado, idServicio) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.createAsignacionTecnicoTransaction(idUsuario,idComercio,idEstado,idServicio)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllAsignacionTecnico,
    getAsignacionTecnicoById,
    createAsignacionTecnico,
    updateAsignacionTecnico,
    deleteAsignacionTecnico,
    createAsignacionTecnicoTransaction,
}