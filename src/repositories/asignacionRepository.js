const db = require('../models')
const Asignacion = db.Asignacion

const getAllAsignacion = async () => {
    try {
        const asignacion = await Asignacion.findAll()
        return asignacion
    } catch (error) {
        throw error
    }
}

const getAsignacionById = async (id) => {
    try {
        const asignacion = await Asignacion.findOne({
            where: {
                id: id
            }
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

const createAsignacion = async (data) => {
    try {
        const asignacion = await Asignacion.create(data)
        return asignacion
    } catch (error) {
        throw error
    }
}

const updateAsignacion = async (data, id) => {
    try {
        const asignacion = await Asignacion.update(data, {
            where: {
                id: id
            }
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

const deleteAsignacion = async (id) => {
    try {
        const asignacion = await Asignacion.destroy({
            where: {
                id: id
            }
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllAsignacion,
    getAsignacionById,
    createAsignacion,
    updateAsignacion,
    deleteAsignacion
}