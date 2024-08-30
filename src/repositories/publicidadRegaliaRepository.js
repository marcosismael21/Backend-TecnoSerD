const db = require("../models")
const Publicidad_Regalia = db.Publicidad_Regalia

const getAllPublicidad_Regalia = async () =>{
    try {
        const publicidad_regalia = await Publicidad_Regalia.findAll()
        return publicidad_regalia;
    } catch (error) {
        throw error
    }
}

const getPublicidad_RegaliaById = async (id) =>{
    try {
        const publicidad_regalia = await Publicidad_Regalia.findOne({
            where: {
                id: id,
            }
        })
        return publicidad_regalia;
    } catch (error) {
        throw error
    }
}

const createPublicidad_Regalia = async (data) =>{
    try {
        const publicidad_regalia = await Publicidad_Regalia.create(data)
        return publicidad_regalia
    } catch (error) {
        throw error
    }
}

const updatePublicidad_Regalia = async (data, id) =>{
    try {
        const publicidad_regalia = await Publicidad_Regalia.update(data, {
            where: {
                id: id
            }
        })
        return publicidad_regalia
    } catch (error) {
        throw error
    }
}

const deletePublicidad_Regalia = async (id) => {
    try {
        const publicidad_regalia = await Publicidad_Regalia.destroy({
            where: {
                id: id
            }
        })
        return publicidad_regalia
    } catch (error) {
        throw error
    }
}



module.exports = {
    getAllPublicidad_Regalia,
    getPublicidad_RegaliaById,
    createPublicidad_Regalia,
    updatePublicidad_Regalia,
    deletePublicidad_Regalia
}