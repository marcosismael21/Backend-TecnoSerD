const db = require('../models')
const Comercio = db.Comercio
const Equipo = db.Equipo
const Asignacion = db.Asignacion

const createComercioConEquiposYAsignacion = async (comercioData, equipos, TipoProblema, idServicio) => {
    const transaction = await db.sequelize.transaction();
    try {
        const comercio = await Comercio.create(comercioData, { transaction });
        
        for (let equipoData of equipos) {
            let equipo;
            // Buscar equipo existente
            const existingEquipo = await getEquiposByDetails(equipoData);
            
            if (existingEquipo) {
                equipo = existingEquipo;
            } else {
                // Crear nuevo equipo sin especificar ID
                equipo = await Equipo.create({
                    idTipoEquipo: equipoData.idTipoEquipo,
                    noserie: equipoData.noserie,
                    noimei: equipoData.noimei,
                    pin: equipoData.pin,
                    puk: equipoData.puk,
                    fechaLlegada: equipoData.fechaLlegada,
                    comodin: equipoData.comodin,
                    estado: equipoData.estado
                }, { transaction });
            }

            await Asignacion.create({
                idComercio: comercio.id,
                idEquipo: equipo.id,
                idEstado: 1,
                tipoProblema: TipoProblema,
                idServicio: idServicio
            }, { transaction });
        }
        
        await transaction.commit();
    } catch (error) {
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

const createComercioConEquiposYAsignacionById = async (comercioId, equipos, TipoProblema, idServicio) => {
    const transaction = await db.sequelize.transaction();
    try {
        for (let equipoData of equipos) {
            let equipo;
            const existingEquipo = await getEquiposByDetails(equipoData);
            
            if (existingEquipo) {
                equipo = existingEquipo;
            } else {
                equipo = await Equipo.create({
                    idTipoEquipo: equipoData.idTipoEquipo,
                    noserie: equipoData.noserie,
                    noimei: equipoData.noimei,
                    pin: equipoData.pin,
                    puk: equipoData.puk,
                    fechaLlegada: equipoData.fechaLlegada,
                    comodin: equipoData.comodin,
                    estado: equipoData.estado
                }, { transaction });
            }

            await Asignacion.create({
                idComercio: comercioId,
                idEquipo: equipo.id,
                idEstado: 1,
                tipoProblema: TipoProblema,
                idServicio: idServicio
            }, { transaction });
        }
        
        await transaction.commit();
    } catch (error) {
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

const getEquiposByDetails = async (equipoData) => {
    const { idTipoEquipo, noserie, noimei, pin, puk } = equipoData;
    try {
        return await Equipo.findOne({
            where: {
                idTipoEquipo,
                ...(noserie && { noserie }),
                ...(noimei && { noimei }),
                ...(pin && { pin }),
                ...(puk && { puk })
            }
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getComercioExistente,
    getEquipoByNoSerie,
    createComercioConEquiposYAsignacion,
    createComercioConEquiposYAsignacionById,
    createEquipos,
    getEquipos,
    getEquiposByDetails,
}