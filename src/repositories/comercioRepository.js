const db = require('../models')
const Comercio = db.Comercio

const getAllComercio = async () => {
    try {
        const comercio = await Comercio.findAll()
        return comercio
    } catch (error) {
        throw error
    }
}

const getComercioById = async (id) => {
    try {
        const comercio = await Comercio.findOne({
            where: {
                id: id
            }
        })
        return comercio
    } catch (error) {
        throw error
    }
}

const createComercio = async (data) => {
    try {
        const comercio = await Comercio.create(data)
        return comercio
    } catch (error) {
        throw error
    }
}

const updateComercio = async (data, id) => {
    try {
        const comercio = await Comercio.update(data, {
            where: {
                id: id
            }
        })
        return comercio
    } catch (error) {
        throw error
    }
}

const deleteComercio = async (id) => {
    try {
        const comercio = await Comercio.destroy({
            where: {
                id: id
            }
        })
        return comercio
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllComercio,
    getComercioById,
    createComercio,
    updateComercio,
    deleteComercio
}