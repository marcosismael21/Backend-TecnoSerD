const comodinRepository = require('../repositories/comodinRepository')

const getAllComodin = async ()=>{
    try {
        const comodin = await comodinRepository.getAllComodin()
        return (comodin) ? comodin : []
    } catch (error) {
        throw error
    }
}

const getComodinById = async (id) => {
    try {
        const comodin = await comodinRepository.getComodinById(id)
        return (comodin) ? comodin : []
    } catch (error) {
        throw error
    }
}

const createComodin = async (data) => {
    try {
        const comodin = await comodinRepository.createComodin(data)
        return (comodin) ? comodin : []
    } catch (error) {
        throw error
    }
}

const updateComodin = async (data, id) => {
    try {
        const comodin = await comodinRepository.updateComodin(data, id)
        return (comodin) ? comodin : []
    } catch (error) {
        throw error
    }
}

const deleteComodin = async (id) => {
    try {
        const comodin = await comodinRepository.deleteComodin(id)
        return (comodin) ? comodin : []
    } catch (error) {
        throw error
    }
}



module.exports = {
    getAllComodin,
    getComodinById,
    createComodin,
    updateComodin,
    deleteComodin
}