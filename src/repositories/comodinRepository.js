const db = require('../models')
const Comodin = db.Comodin

const getAllComodin = async ()=>{
    try {
        const comodin = await Comodin.findAll()
        return comodin
    } catch (error) {
        throw error
    }
}

const getComodinById = async (id) => {
    try {
        const comodin = await Comodin.findOne({
            where:{
                id:id
            }
        })
        return comodin
    } catch (error) {
        throw error
    }
}

const createComodin = async (data) => {
    try {
        const comodin = await Comodin.create(data)
        return comodin
    } catch (error) {
        throw error
    }
}

const updateComodin = async (data, id) => {
    try {
        const comodin = await Comodin.update(data,{
            where:{
                id:id
            }
        })
        return comodin
    } catch (error) {
        throw error
    }
}

const deleteComodin = async (id) => {
    try {
        const comodin = await Comodin.destroy({
            where:{
                id:id
            }
        })
        return comodin
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