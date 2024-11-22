const publicidadClienteRepository = require('../repositories/publicidadClienteRepository')

const getAllPublicidadCliente = async () => {
    try {
        const publicidadCliente = await publicidadClienteRepository.getAllPublicidadCliente()
        return (publicidadCliente)? publicidadCliente : []
    } catch (error) {
        throw error
    }
}

const getPublicidadClienteById = async (id) => {
    try {
        const publicidadCliente = await publicidadClienteRepository.getPublicidadClienteById(id)
        return (publicidadCliente)? publicidadCliente : []
    } catch (error) {
        throw error
    }
}

const createPublicidadCliente = async (data) => {
    try {
        const publicidadCliente = await publicidadClienteRepository.createPublicidadCliente(data)
        return (publicidadCliente)? publicidadCliente : []
    } catch (error) {
        throw error
    }
}

const updatePublicidadCliente = async (data, id) => {
    try {
        const publicidadCliente = await publicidadClienteRepository.updatePublicidadCliente(data, id)
        return (publicidadCliente)? publicidadCliente : []
    } catch (error) {
        throw error
    }
}

const deletePublicidadCliente = async (id) => {
    try {
        const publicidadCliente = await publicidadClienteRepository.deletePublicidadCliente(id)
        return (publicidadCliente)? publicidadCliente : []
    } catch (error) {
        throw error
    }
}

const getAllPublicidadRegaliaByIdUsuario = async (IdUsuario) => {
    try {
        const publicidadRegalia = await publicidadClienteRepository.getAllPublicidadRegaliaByIdUsuario(IdUsuario)
        return (publicidadRegalia)? publicidadRegalia : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPublicidadCliente,
    getPublicidadClienteById,
    createPublicidadCliente,
    updatePublicidadCliente,
    deletePublicidadCliente,
    getAllPublicidadRegaliaByIdUsuario,
}