const reportesServices = require('../services/reportesServices')

const getAllAsignacionEspera = async (req, res, next) => {
    try {
        const reportes = await reportesServices.getAllAsignacionEspera()
        return res.status(200).json(reportes)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllAsignacionEspera,
}