const db = require('../models')
const AsignacionTecnico = db.AsignacionTecnico

const getAllAsignacionTecnico = async () => {
    try {
        const asignacionTecnico = await AsignacionTecnico.findAll()
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const getAsignacionTecnicoById = async (id) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.findOne({
            where: {
                id: id
            }
        })
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const createAsignacionTecnico = async (data) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.create(data)
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const updateAsignacionTecnico = async (data, id) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.update(data, {
            where: {
                id: id
            }
        })
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const deleteAsignacionTecnico = async (id) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.destroy({
            where: {
                id: id
            }
        })
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllAsignacionTecnico,
    getAsignacionTecnicoById,
    createAsignacionTecnico,
    updateAsignacionTecnico,
    deleteAsignacionTecnico
}