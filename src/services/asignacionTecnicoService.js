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
        const asignacionTecnico = await asignacionTecnicoRepository.createAsignacionTecnicoTransaction(idUsuario, idComercio, idEstado, idServicio)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const createMultipleAsignaciones = async (asignaciones) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.createMultipleAsignaciones(asignaciones)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const getAllAsignacionTecnicoSQL = async (idEstado) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.getAllAsignacionTecnicoSQL(idEstado)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const getAllByTecnicoComercioEstadoServicio = async (idUsuario, idComercio, idEstado, idServicio) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.getAllByTecnicoComercioEstadoServicio(idUsuario, idComercio, idEstado, idServicio)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const cancelarAsignacion = async (idUsuario, idComercio, idServicio, idEstado) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.cancelarAsignacion(idUsuario, idComercio, idServicio, idEstado)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const getAllListAsignacionesByTecnico = async (idUsuario) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.getAllListAsignacionesByTecnico(idUsuario)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const getAllByTecnicoComercioEstadoServicioDetalle = async (idUsuario, idComercio, idEstado, idServicio) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.getAllByTecnicoComercioEstadoServicioDetalle(idUsuario, idComercio, idEstado, idServicio)
        return (asignacionTecnico) ? asignacionTecnico : []
    } catch (error) {
        throw error
    }
}

const changeStatusAsignacion = async (data) => {
    try {
        const asignacionTecnico = await asignacionTecnicoRepository.changeStatusAsignacion(data)
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
    createMultipleAsignaciones,
    getAllAsignacionTecnicoSQL,
    getAllByTecnicoComercioEstadoServicio,
    cancelarAsignacion,
    getAllListAsignacionesByTecnico,
    getAllByTecnicoComercioEstadoServicioDetalle,
    changeStatusAsignacion,
}