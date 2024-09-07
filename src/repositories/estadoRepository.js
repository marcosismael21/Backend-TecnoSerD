const db = require('../models')
const Estado = db.Estado

const getAllEstado = async () => {
    try {
        const estado = await Estado.findAll()
        return estado
    } catch (error) {
        throw error
    }
}

const getEstadoById = async (id) => {
    try {
        const estado = await Estado.findOne({
            where: {
                id: id
            }
        })
        return estado
    } catch (error) {
        throw error
    }
}

const createEstado = async (data) => {
    try {
        const estado = await Estado.create(data)
        return estado
    } catch (error) {
        throw error
    }
}

const updateEstado = async (data, id) => {
    try {
        const estado = await Estado.update(data, {
            where: {
                id: id
            }
        })
        return estado
    } catch (error) {
        throw error
    }
}

const deleteEstado = async (id) => {
    try {
        const estado = await Estado.destroy({
            where: {
                id: id
            }
        })
        return estado
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllEstado,
    getEstadoById,
    createEstado,
    updateEstado,
    deleteEstado
}