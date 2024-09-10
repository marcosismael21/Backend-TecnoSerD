const canalRepository = require('../repositories/canalRepository')

const getAllCanal = async () => {
    try {
        const canal = await canalRepository.getAllCanal()
        return (canal) ? canal : []
    } catch (error) {
        throw error
    }
}

const getCanalById = async (id) => {
    try {
        const canal = await canalRepository.getCanalById(id)
        return (canal) ? canal : []
    } catch (error) {
        throw error
    }
}

const createCanal = async (data) => {
    try {
        const canal = await canalRepository.createCanal(data)
        return (canal) ? canal : []
    } catch (error) {
        throw error
    }
}

const updateCanal = async (data, id) => {
    try {
        const canal = await canalRepository.updateCanal(data, id)
        return (canal) ? canal : []
    } catch (error) {
        throw error
    }
}

const deleteCanal = async (id) => {
    try {
        const canal = await canalRepository.deleteCanal(id)
        return (canal) ? canal : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCanal,
    getCanalById,
    createCanal,
    updateCanal,
    deleteCanal,
}