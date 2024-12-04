const equipoService = require('../services/tableroServices')

const getSparklineInstalaciones = async (req, res, next) => {
    try {
        const equipo = await equipoService.getSparklineInstalaciones()
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const getSparklineSoportes = async (req, res, next) => {
    try {
        const equipo = await equipoService.getSparklineSoportes()
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const getSparklineRetiros = async (req, res, next) => {
    try {
        const equipo = await equipoService.getSparklineRetiros()
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const getServiciosPorCiudad = async (req, res, next) => {
    try {
        const equipo = await equipoService.getServiciosPorCiudad()
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const getAsignacionesPorEstado = async (req, res, next) => {
    try {
        const equipo = await equipoService.getAsignacionesPorEstado()
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const getCrecimientoEquiposPorEstado= async (req, res, next) => {
    try {
        const equipo = await equipoService.getCrecimientoEquiposPorEstado()
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const getCantidadEquiposPorEstado = async (req, res, next) => {
    try {
        const equipo = await equipoService.getCantidadEquiposPorEstado();
        return res.status(200).json(equipo);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getSparklineInstalaciones,
    getSparklineSoportes,
    getSparklineRetiros,
    getServiciosPorCiudad,
    getAsignacionesPorEstado,
    getCrecimientoEquiposPorEstado,
    getCantidadEquiposPorEstado,
}