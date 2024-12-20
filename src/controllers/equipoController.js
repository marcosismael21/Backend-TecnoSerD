const equipoService = require('../services/equipoService')

const getAllEquipo = async (req, res, next) => {
    try {
        const equipo = await equipoService.getAllEquipo()
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const getEquipoByEstado = async (req, res, next) => {
    const estado = req.params.estado
    try {
        const equipo = await equipoService.getEquipoByEstado(estado)
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const getEquipoByComodin = async (req, res, next) => {
    const comodin = req.params.comodin
    try {
        const equipo = await equipoService.getEquipoByComodin(comodin)
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const getEquipoById = async (req, res, next) => {
    const id = req.params.id
    try {
        const equipo = await equipoService.getEquipoById(id)
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

const createEquipo = async (req, res, next) => {
    const {
        idTipoEquipo,
        noserie,
        noimei,
        pin,
        puk,
        fechaLlegada,
        comodin,
        estado

    } = req.body

    const data = {
        idTipoEquipo,
        noserie,
        noimei,
        pin,
        puk,
        fechaLlegada,
        comodin,
        estado
    }

    try {
        const equipo = await equipoService.createEquipo(data)
        return res.status(200).json({ equipo, message: 'Se creo correctamente.' })
    } catch (error) {
        next(error)
    }
}

const updateEquipo = async (req, res, next) => {
    const id = req.params.id

    const {
        idTipoEquipo,
        noserie,
        noimei,
        pin,
        puk,
        fechaLlegada,
        comodin,
        estado
    } = req.body

    const data = {
        idTipoEquipo,
        noserie,
        noimei,
        pin,
        puk,
        fechaLlegada,
        comodin,
        estado
    }

    try {
        const equipo = await equipoService.updateEquipo(data, id)
        return res.status(200).json({ equipo, message: 'Se actualizo correctamente.' })
    } catch (error) {
        next(error)
    }
}

const deleteEquipo = async (req, res, next) => {
    const id = req.params.id
    try {
        const equipo = await equipoService.deleteEquipo(id)
        return res.status(200).json({equipo, message: 'Se elimino correctamente.'})
    } catch (error) {
        next(error)
    }
}

const changeEquipoStatus = async (req, res, next) => {
    const id = req.params.id
    const {
        estado
    } = req.body;

    const data = {
        estado
    }
    try {
        const equipo = await equipoService.updateEquipo(data, id)
        return res.status(200).json({equipo, message: 'Se cambio el estado correctamente.'})
    } catch (error) {
        next(error)
    }
}

const getCantidadEquipos = async (req, res, next) => {
    try {
        const equipo = await equipoService.getCantidadEquipos()
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
};

const getEquipoSinAsignar = async (req, res, next) => {
    try {
        const equipo = await equipoService.getEquipoSinAsignar()
        return res.status(200).json(equipo)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllEquipo,
    getEquipoById,
    createEquipo,
    updateEquipo,
    deleteEquipo,
    getEquipoByEstado,
    getEquipoByComodin,
    changeEquipoStatus,
    getCantidadEquipos,
    getCantidadEquiposPorEstado,
    getEquipoSinAsignar
}