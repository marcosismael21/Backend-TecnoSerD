const comodinService = require('../services/comodinService')

const getAllComodin = async (req, res, next) =>{
    try {
        const comodin = await comodinService.getAllComodin()
        return res.status(200).json(comodin)
    } catch (error) {
        next(error)
    }
}

const getComodinById = async (req, res, next) =>{
    const id = req.params.id
    try{
        const comodin = await comodinService.getComodinById(id)
        return res.status(200).json(comodin)
    } catch (error){
        next(error)
    }
}

const createComodin = async (req, res, next) =>{
    const {
        nombre,
        noSerie,
        noImei
    } = req.body

    const data = {
        nombre,
        noSerie,
        noImei
    }

    try {
        const comodin = await comodinService.createComodin(data)
        return res.status(200).json(comodin)
    } catch (error) {
        next (error)
    }
}

const updateComodin = async (req, res, next) =>{
    const id = req.params.id
    
    const{
        nombre,
        noSerie,
        noImei
    }=req.body

    const data ={
        nombre,
        noSerie,
        noImei
    }

    try {
        const comodin = await comodinService.updateComodin(data, id)
        return res.status(200).json(comodin)
    } catch (error) {
        next (error)
    }

}

const deleteComodin = async (req, res, next) =>{
    const id=req.params.id
    try {
        const comodin = await comodinService.deleteComodin(id)
        return res.status(200).json(comodin)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllComodin,
    getComodinById,
    createComodin,
    updateComodin,
    deleteComodin
}