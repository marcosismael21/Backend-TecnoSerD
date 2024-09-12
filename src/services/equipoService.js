const equipoRepository = require('../repositories/equipoRepository')

const getAllEquipo = async () => {
    try {
        const equipo = await equipoRepository.getAllEquipo()
        return (equipo) ? equipo : []
    } catch (error) {
        throw error
    }
}

const getEquipoByComodin = async (comodin) => {
    try {
        const equipo = await equipoRepository.getEquipoByComodin(comodin)
        return (equipo) ? equipo : []
    } catch (error) {
        throw error
    }
}

const getEquipoByEstado = async (estado) => {
    try {
        const equipo = await equipoRepository.getEquipoByEstado(estado)
        return (equipo) ? equipo : []
    } catch (error) {
        throw error
    }
}

const getEquipoById = async (id) => {
    try {
        const equipo = await equipoRepository.getEquipoById(id)
        return (equipo) ? equipo : []
    } catch (error) {
        throw error
    }
}

const createEquipo = async (data) => {
    try {
        const equipo = await equipoRepository.createEquipo(data)
        return (equipo) ? equipo : []
    } catch (error) {
        throw error
    }
}

const updateEquipo = async (data, id) => {
    try {
        const equipo = await equipoRepository.updateEquipo(data, id)
        return (equipo) ? equipo : []
    } catch (error) {
        throw error
    }
}

const deleteEquipo = async (id) => {
    try {
        const equipo = await equipoRepository.deleteEquipo(id)
        return (equipo) ? equipo : []
    } catch (error) {
        throw error
    }
}

const getCantidadEquipos = async () => {
    try {
        const equipo = await equipoRepository.getCantidadEquipos()
        return (equipo) ? equipo : []
    } catch (error) {
        throw error
    }
}

const getCantidadEquiposPorEstado = async () => {
    try {
        const equipo = await equipoRepository.getCantidadEquiposPorEstado();
        return (equipo) ? equipo : []
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllEquipo,
    getEquipoById,
    createEquipo,
    updateEquipo,
    deleteEquipo,
    getEquipoByEstado,
    getEquipoByComodin,
    getCantidadEquipos,
    getCantidadEquiposPorEstado
}