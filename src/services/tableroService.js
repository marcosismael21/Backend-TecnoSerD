const equipoRepository = require('../repositories/tableroRepository')

const getSparklineInstalaciones = async () => {
    try {
        const equipo = await equipoRepository.getSparklineInstalaciones()
         return (equipo) ? equipo : []
    } catch (error) {
         throw error
    }
}

const getSparklineSoportes = async () => {
    try {
        const equipo = await equipoRepository.getSparklineSoportes()
         return (equipo) ? equipo : []
    } catch (error) {
         throw error
    }
}

const getSparklineRetiros = async () => {
    try {
        const equipo = await equipoRepository.getSparklineRetiros()
         return (equipo) ? equipo : []
    } catch (error) {
         throw error
    }
}

const getServiciosPorCiudad = async () => {
    try {
        const equipo = await equipoRepository.getServiciosPorCiudad()
         return (equipo) ? equipo : []
    } catch (error) {
         throw error
    }
}

const getAsignacionesPorEstado = async () => {
    try {
        const equipo = await equipoRepository.getAsignacionesPorEstado()
         return (equipo) ? equipo : []
    } catch (error) {
         throw error
    }
}

const getCrecimientoEquiposPorEstado = async () => {
    try {
        const equipo = await equipoRepository.getCrecimientoEquiposPorEstado()
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
    getSparklineInstalaciones,
    getSparklineSoportes,
    getSparklineRetiros,
    getServiciosPorCiudad,
    getAsignacionesPorEstado,
    getCrecimientoEquiposPorEstado,
    getCantidadEquiposPorEstado,
    
}