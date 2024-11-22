const publicidadRegaliaRepository = require('../repositories/publicidadRegaliaRepository')

const getAllPublicidad_Regalia = async () => {
    try {
        const publicidad_regalia = await publicidadRegaliaRepository.getAllPublicidad_Regalia()
        return (publicidad_regalia) ? publicidad_regalia : []
    } catch (error) {
        throw error
    }
}

const getPublicidad_RegaliaById = async (id) => {
    try {
        const publicidad_regalia = await publicidadRegaliaRepository.getPublicidad_RegaliaById(id)
        return (publicidad_regalia) ? publicidad_regalia : []
    } catch (error) {
        error
    }
}

const createPublicidad_Regalia = async (data) => {
    try {
        const publicidad_regalia = await publicidadRegaliaRepository.createPublicidad_Regalia(data)
        return (publicidad_regalia) ? publicidad_regalia : []
    } catch (error) {
        throw error
    }
}

const updatePublicidad_Regalia = async (data, id) => {
    try {
        const publicidad_regalia = await publicidadRegaliaRepository.updatePublicidad_Regalia(data, id)
        return (publicidad_regalia) ? publicidad_regalia : []
    } catch (error) {
        throw error
    }
}

const deletePublicidad_Regalia = async (id) => {
    try {
        const publicidad_regalia = await publicidadRegaliaRepository.deletePublicidad_Regalia(id)
        return (publicidad_regalia) ? publicidad_regalia : []
    } catch (error) {
        throw error
    }
}

const getPublicidad = async () => {
    try {
        const publicidad = await publicidadRegaliaRepository.getPublicidad()
        return (publicidad) ? publicidad : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPublicidad_Regalia,
    getPublicidad_RegaliaById,
    createPublicidad_Regalia,
    updatePublicidad_Regalia,
    deletePublicidad_Regalia,
    getPublicidad,
}