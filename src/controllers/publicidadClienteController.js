const publicidadClienteService = require('../services/publicidadClienteService')

const getAllPublicidadCliente = async (req, res, next) => {
    try {
        const publicidadCliente = await publicidadClienteService.getAllPublicidadCliente()
        return res.status(200).json(publicidadCliente)
    } catch (error) {
        next(error)
    }
}

const getPublicidadClienteById = async (req, res, next) => {
    const id = req.params.id
    try {
        const publicidadCliente = await publicidadClienteService.getPublicidadClienteById(id)
        return res.status(200).json(publicidadCliente)
    } catch (error) {
        next(error)
    }
}

const createPublicidadCliente = async (req, res, next) => {
    const {
        idPublicidad,
        idCliente
    } = req.body
        
    const data = {
        idPublicidad,
        idCliente    
    }

    try {
        const publicidadCliente = await publicidadClienteService.createPublicidadCliente(data)
        return res.status(200).json(publicidadCliente)
    } catch (error) {
        next(error)
    }
}

const updatePublicidadCliente = async (req, res, next) => {
    const id = req.params.id
    const {
        idPublicidad,
        idCliente
    } = req.body
        
    const data = {
        idPublicidad,
        idCliente
    }

    try {
        const publicidadCliente = await publicidadClienteService.updatePublicidadCliente(data, id)
        return res.status(200).json(publicidadCliente)
    } catch (error) {
        next(error)
    }
}

const deletePublicidadCliente = async (req, res, next) => {
    const id = req.params.id
    try {
        const publicidadCliente = await publicidadClienteService.deletePublicidadCliente(id)
        return res.status(200).json(publicidadCliente)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPublicidadCliente,
    getPublicidadClienteById,
    createPublicidadCliente,
    updatePublicidadCliente,
    deletePublicidadCliente
}