const db = require('../models')
const Ciudad = db.Ciudad

const getAllCiudad = async () => {
    try {
        const ciudad = await Ciudad.findAll()
        return ciudad
    } catch (error) {
        throw error
    }
}

const getCiudadById = async (id) => {
    try {
        const ciudad = await Ciudad.findOne({
            where: {
                id: id
            }
        })
        return ciudad
    } catch (error) {
        throw error
    }
}

const createCiudad = async (data) => {
    try {
        const ciudad = await Ciudad.create(data)
        return ciudad
    } catch (error) {
        throw error
    }
}

const updateCiudad = async (data, id) => {
    try {
        const ciudad = await Ciudad.update(data, {
            where: {
                id: id
            }
        })
        return ciudad
    } catch (error) {
        throw error
    }
}

const deleteCiudad = async (id) => {
    try {
        const ciudad = await Ciudad.destroy({
            where: {
                id: id
            }
        })
        return ciudad
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCiudad,
    getCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad
}