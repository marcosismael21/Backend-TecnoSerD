const db = require('../models')
const TipoComercio = db.TipoComercio

const getAllTipoComercio = async () => {
    try {
        const tipoComercio = await TipoComercio.findAll()
        return tipoComercio
    } catch (error) {
        throw error
    }
}

const getTipoComercioById = async (id) => {
    try {
        const tipoComercio = await TipoComercio.findOne({
            where: {
                id: id
            }
        })
        return tipoComercio
    } catch (error) {
        throw error
    }
}

const createTipoComercio = async (data) => {
    try {
        const tipoComercio = await TipoComercio.create(data)
        return tipoComercio
    } catch (error) {
        throw error
    }
}

const updateTipoComercio = async (data, id) => {
    try {
        const tipoComercio = await TipoComercio.update(data, {
            where: {
                id: id
            }
        })
        return tipoComercio
    } catch (error) {
        throw error
    }
}

const deleteTipoComercio = async (id) => {
    try {
        const tipoComercio = await TipoComercio.destroy({
            where: {
                id: id
            }
        })
        return tipoComercio
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoComercio,
    getTipoComercioById,
    createTipoComercio,
    updateTipoComercio,
    deleteTipoComercio
}