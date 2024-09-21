const db = require('../models')
const Comercio = db.Comercio
const Equipo = db.Equipo
const Asignacion = db.Asignacion
const Servicio = db.Servicio
const Estado = db.Estado

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction
} = require('sequelize');

const createComercio = async (data) => {
    try {
        const comercio = await Comercio.create(data);
        return comercio
    } catch (error) {
        throw error
    }
}

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

// Función para crear un nuevo equipo
const createEquipo = async (data) => {
    try {
        const equipo = await Equipo.create(data);
        return equipo;
    } catch (error) {
        throw error;
    }
};

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

// Crear comercio, equipos y asignar en una sola transacción
/*const createComercioConEquiposYAsignacion = async (comercioData, equiposData, tipoProblema, tipoGestion, canal) => {
    try {
        // Iniciar la transacción
        const result = await sequelize.transaction(async (t) => {
            // Crear el comercio
            const comercio = await Comercio.create(comercioData, { transaction: t });

            // Crear los equipos asociados y almacenar sus IDs
            const equipoIds = await Promise.all(equiposData.map(async (equipoData) => {
                const equipo = await Equipo.create(equipoData, { transaction: t });
                return equipo.id;
            }));

            // Buscar el servicio según el tipo de gestión y canal
            const servicio = await Servicio.findOne({
                where: {
                    nombre: tipoGestion,
                    idcanal: canal
                },
                transaction: t
            });

            if (!servicio) {
                throw new Error(`No se encontró un servicio para la gestión: ${tipoGestion} y canal: ${canal}`);
            }

            // Buscar el estado "En espera"
            const estado = await Estado.findOne({ where: { nombre: 'En espera' }, transaction: t });

            if (!estado) {
                throw new Error(`Estado 'En espera' no encontrado`);
            }

            // Crear las asignaciones para cada equipo
            await Promise.all(equipoIds.map(async (idEquipo) => {
                await Asignacion.create({
                    idComercio: comercio.id,
                    idServicio: servicio.id,
                    idEquipo: idEquipo,
                    tipoProblema: tipoProblema,
                    idEstado: estado.id
                }, { transaction: t });
            }));

            return comercio; // Retorna el comercio creado
        });

        return result;
    } catch (error) {
        console.error('Error en la transacción:', error);
        throw error;
    }
};*/

const createComercioConEquiposYAsignacion = async (comercioData, equipos) => {
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
                idEquipo: equipo.id
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

module.exports = {
    createComercio,
    getComercioExistente,
    createEquipo,
    getEquipoByNoSerie,
    createComercioConEquiposYAsignacion,
}