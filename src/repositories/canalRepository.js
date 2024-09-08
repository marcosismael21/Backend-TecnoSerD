const db = require('../models')
const Canal = db.Canal

const getAllCanal = async () => {
    try {
        const canal = await Canal.findAll()
        return canal
    } catch (error) {
        throw error
    }
}

const getCanalById = async (id) => {
    try {
        const canal = await Canal.findOne({
            where: {
                id: id
            }
        })
        return canal
    } catch (error) {
        throw error
    }
}

const createCanal = async (data) => {
    try {
        const canal = await Canal.create(data)
        return canal
    } catch (error) {
        throw error
    }
}

const updateCanal = async (data, id) => {
    try {
        const canal = await Canal.update(data, {
            where: {
                id: id
            }
        })
        return canal
    } catch (error) {
        throw error
    }
}

const deleteCanal = async (id) => {
    try {
        const canal = await Canal.destroy({
            where: {
                id: id
            }
        })
        return canal
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCanal,
    getCanalById,
    createCanal,
    updateCanal,
    deleteCanal
}