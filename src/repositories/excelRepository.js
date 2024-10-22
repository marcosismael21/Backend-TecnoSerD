const db = require('../models')
const Comercio = db.Comercio
const Equipo = db.Equipo
const Asignacion = db.Asignacion

const createComercioConEquiposYAsignacion = async (comercioData, equipos, TipoProblema, idServicio) => {
    const transaction = await db.sequelize.transaction(); // Iniciar transacción
    try {
        // Crear comercio
        const comercio = await Comercio.create(comercioData, { transaction });

        // Crear equipos asociados al comercio
        for (let equipoData of equipos) {
            const equipo = await Equipo.create(equipoData, { transaction });

            // Crear asignación del equipo al comercio
            await Asignacion.create({
                idComercio: comercio.id,
                idEquipo: equipo.id,
                idEstado: 1, // idEstado siempre será 1
                tipoProblema: TipoProblema,
                idServicio: idServicio
            }, { transaction });
        }

        // Confirmar transacción si todo sale bien
        await transaction.commit();
    } catch (error) {
        // Revertir transacción si algo falla
        await transaction.rollback();
        throw error;
    }
};

const getComercioExistente = async (rtn, nombreComercio) => {
    try {
        const comercio = await Comercio.findOne({
            where: {
                rtn: rtn,
                nombreComercio: nombreComercio
            }
        })
        return comercio
    } catch (error) {
        throw error
    }
}

// Función para verificar si un equipo ya existe por número de serie (noserie)
const getEquipoByNoSerie = async (noserie) => {
    try {
        const equipo = await Equipo.findOne({
            where: {
                noserie: noserie
            }
        });
        return equipo;
    } catch (error) {
        throw error;
    }
};

const createComercioConEquiposYAsignacionById = async (comercioid, equipos, TipoProblema, idServicio) => {
    const transaction = await db.sequelize.transaction(); // Iniciar transacción
    try {
        // Crear equipos asociados al comercio
        for (let equipoData of equipos) {
            const equipo = await Equipo.create(equipoData, { transaction });

            // Crear asignación del equipo al comercio
            await Asignacion.create({
                idComercio: comercioid,
                idEquipo: equipo.id,
                idEstado: 1, // idEstado siempre será 1
                tipoProblema: TipoProblema,
                idServicio: idServicio
            }, { transaction });
        }

        // Confirmar transacción si todo sale bien
        await transaction.commit();
    } catch (error) {
        // Revertir transacción si algo falla
        await transaction.rollback();
        throw error;
    }
};

const createEquipos = async (equipos) => {
    try {
        for (let equipoData of equipos) {
            await Equipo.create(equipoData);
        }
    } catch (error) {
        throw error
    }
}

const getEquipos = async (equipos) => {
    try {
        const { idTipoEquipo, noserie } = equipos
        const equipo = await Equipo.findOne({
            where:{
                idTipoEquipo: idTipoEquipo,
                noserie: noserie,
            }
        })
        return equipo
    } catch (error) {
        throw error
    }
}

module.exports = {
    getComercioExistente,
    getEquipoByNoSerie,
    createComercioConEquiposYAsignacion,
    createComercioConEquiposYAsignacionById,
    createEquipos,
    getEquipos,
}