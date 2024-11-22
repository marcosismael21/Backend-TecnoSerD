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
        idPublicidadRegalia,
        idComercio,
        cantidad,
        estado
    } = req.body

    const data = {
        idPublicidadRegalia,
        idComercio,
        cantidad,
        estado
    }

    try {
        const publicidadCliente = await publicidadClienteService.createPublicidadCliente(data)
        return res.status(200).json({ publicidadCliente, message: "Se creo correctamente." })
    } catch (error) {
        next(error)
    }
}

const updatePublicidadCliente = async (req, res, next) => {
    const id = req.params.id
    const {
        idPublicidadRegalia,
        idComercio,
        cantidad,
        estado
    } = req.body

    const data = {
        idPublicidadRegalia,
        idComercio,
        cantidad,
        estado
    }

    try {
        const publicidadCliente = await publicidadClienteService.updatePublicidadCliente(data, id)
        return res.status(200).json({ publicidadCliente, message: "Se actualizo correctamente." })
    } catch (error) {
        next(error)
    }
}

const deletePublicidadCliente = async (req, res, next) => {
    const id = req.params.id
    try {
        const publicidadCliente = await publicidadClienteService.deletePublicidadCliente(id)
        return res.status(200).json({ publicidadCliente, message: "Se elimino correctamente." })
    } catch (error) {
        next(error)
    }
}

const getAllPublicidadRegaliaByIdUsuario = async (req, res, next) => {
    const idUsuario = req.params.idUsuario
    try {
        const publicidadCliente = await publicidadClienteService.getAllPublicidadRegaliaByIdUsuario(idUsuario)
        return res.status(200).json(publicidadCliente)
    } catch (error) {
        next(error)
    }
}

const changeStatusPublicidad = async (req, res, next) => {
    const id = req.params.id

    const { estado } = req.body

    const data = {
        estado
    }
    try {
        const publicidadCliente = await publicidadClienteService.updatePublicidadCliente(data, id)
        return res.status(200).json({ publicidadCliente, message: "Se finalizo correctamente." })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPublicidadCliente,
    getPublicidadClienteById,
    createPublicidadCliente,
    updatePublicidadCliente,
    deletePublicidadCliente,
    getAllPublicidadRegaliaByIdUsuario,
    changeStatusPublicidad,
}