const db = require('../models')
const Equipo = db.Equipo

const getAllEquipo = async () => {
    try {
        const equipo = await Equipo.findAll()
        return equipo
    } catch (error) {
        throw error
    }
}

const getEquipoById = async (id) => {
    try {
        const equipo = await Equipo.findOne({
            where: {
                id: id
            }
        })
        return equipo
    } catch (error) {
        throw error
    }
}

const createEquipo = async (data) => {
    try {
        const equipo = await Equipo.create(data)
        return equipo
    } catch (error) {
        throw error
    }
}

const updateEquipo = async (data, id) => {
    try {
        const equipo = await Equipo.update(data, {
            where: {
                id: id
            }
        })
        return equipo
    } catch (error) {
        throw error
    }
}

const deleteEquipo = async (id) => {
    try {
        const equipo = await Equipo.destroy({
            where: {
                id: id
            }
        })
        return equipo
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllEquipo,
    getEquipoById,
    createEquipo,
    updateEquipo,
    deleteEquipo
}