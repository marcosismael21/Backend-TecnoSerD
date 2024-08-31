const db = require("../models")
const PublicidadCliente = db.PublicidadCliente

const getAllPublicidadCliente = async () => {
    try {
        const publicidadCliente = await PublicidadCliente.findAll()
        return publicidadCliente;
    } catch (error) {
        throw error
    }
}

const getPublicidadClienteById = async (id) => {
    try {
        const publicidadCliente = await PublicidadCliente.findOne({
            where: {
                id: id
            }
        })
        return publicidadCliente;
    } catch (error) {
        throw error
    }
}

const createPublicidadCliente = async (data) => {
    try {
        const publicidadCliente = await PublicidadCliente.create(data)
        return publicidadCliente
    } catch (error) {
        throw error
    }
}

const updatePublicidadCliente = async (data, id) => {
    try {
        const publicidadCliente = await PublicidadCliente.update(data, {
            where: {
                id: id
            }
        })
        return publicidadCliente
    } catch (error) {
        throw error
    }
}

const deletePublicidadCliente = async (id) => {
    try {
        const publicidadCliente = await PublicidadCliente.destroy({
            where: {
                id: id
            }
        })
        return publicidadCliente
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPublicidadCliente,
    getPublicidadClienteById,
    createPublicidadCliente,
    updatePublicidadCliente,
    deletePublicidadCliente
}