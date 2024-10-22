const db = require('../models')
const Asignacion = db.Asignacion
const Equipo = db.Equipo

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction
} = require('sequelize');

const getAllAsignacion = async () => {
    try {
        const sql = `
            SELECT
	            asig.idComercio,
	            asig.idServicio,
	            asig.idEstado,
	            co.nombreComercio AS nomComerio,
	            co.longitud,
	            co.latitud,
	            CONCAT( se.nombre, ' ', ca.nombre ) AS servicio,
	            asig.tipoProblema,
	            es.nombre AS estado,
	            GROUP_CONCAT( ti.nombre SEPARATOR ', ' ) AS listEquipos,
                GROUP_CONCAT(eq.id SEPARATOR ', ') AS listEquiposIDs 
            FROM
	            asignacions AS asig
	            LEFT JOIN comercios AS co ON co.id = asig.idComercio
	            LEFT JOIN servicios AS se ON se.id = asig.idServicio
	            LEFT JOIN estados AS es ON es.id = asig.idEstado
	            LEFT JOIN canals AS ca ON ca.id = se.idcanal
	            LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
	            LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo 
            GROUP BY
	            asig.idComercio,
	            asig.idServicio,
	            asig.idEstado,
	            asig.tipoProblema,
	            asig.idEstado,
	            co.nombreComercio,
	            co.longitud,
	            co.latitud,
	            se.nombre,
	            ca.nombre,
	            es.nombre;`

        const asignacion = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

const getAllByComercioEstadoServicio = async (idComercio, idEstado, idServicio) => {
    try {
        const sql = `
            SELECT
                asig.idComercio,
                asig.idServicio,
                asig.idEstado,
                co.nombreComercio AS nomComerio,
                co.longitud,
                co.latitud,
                CONCAT(se.nombre, ' ', ca.nombre) AS servicio,
                asig.tipoProblema,
                es.nombre AS estado,
                GROUP_CONCAT(
            CASE 
                WHEN eq.idTipoEquipo IN (9, 10) THEN CONCAT(ti.nombre, ': pin:', eq.pin, ' puk:', eq.puk)
                ELSE CONCAT(ti.nombre, ': NS:', eq.noserie)
            END SEPARATOR ', ') AS listEquipos,
            GROUP_CONCAT(eq.id SEPARATOR ', ') AS listEquiposIDs 
            FROM
                asignacions AS asig
                LEFT JOIN comercios AS co ON co.id = asig.idComercio
                LEFT JOIN servicios AS se ON se.id = asig.idServicio
                LEFT JOIN estados AS es ON es.id = asig.idEstado
                LEFT JOIN canals AS ca ON ca.id = se.idcanal
                LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
                LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo 
            WHERE
                asig.idComercio = :xcomercio 
                AND asig.idEstado = :xestado
                AND asig.idServicio = :xservicio
            GROUP BY
                asig.idComercio,
                asig.idServicio,
                asig.idEstado,
                asig.tipoProblema,
                co.nombreComercio,
                co.longitud,
                co.latitud,
                se.nombre,
                ca.nombre,
                es.nombre`

        const asignacion = await sequelize.query(sql, {
            replacements: {
                xcomercio: idComercio,
                xestado: idEstado,
                xservicio: idServicio
            },
            type: QueryTypes.SELECT
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

const getAsignacionById = async (id) => {
    try {
        const asignacion = await Asignacion.findOne({
            where: {
                id: id
            }
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

const createAsignacion = async (data) => {
    try {
        const asignacion = await Asignacion.create(data)
        return asignacion
    } catch (error) {
        throw error
    }
}

const updateAsignacion = async (data, id) => {
    try {
        const asignacion = await Asignacion.update(data, {
            where: {
                id: id
            }
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

const deleteAsignacion = async (id) => {
    try {
        const asignacion = await Asignacion.destroy({
            where: {
                id: id
            }
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

const updateAsignacionConTransaccion = async (data) => {
    const {
        idComercio,
        idServicio,
        idEstado,
        nuevosEquipos,
        tipoProblema,
    } = data;

    const transaction = await db.sequelize.transaction(); // Iniciar transacción

    try {
        // Obtener los equipos actualmente asignados al comercio
        const equiposAsignadosAnteriormente = await Asignacion.findAll({
            where: {
                idComercio: idComercio,
                idServicio: idServicio,
                idEstado: idEstado
            },
            attributes: ['idEquipo'], // Solo necesitamos los IDs de los equipos asignados
            transaction
        });

        const equiposAsignadosIds = equiposAsignadosAnteriormente.map(asignacion => asignacion.idEquipo);

        const equiposArray = Array.isArray(nuevosEquipos) ? nuevosEquipos : [nuevosEquipos];

        // Identificar equipos desasignados (que estaban antes, pero ya no están en nuevosEquipos)
        const equiposDesasignados = equiposAsignadosIds.filter(idEquipo => !equiposArray.includes(idEquipo));

        // 1. Cambiar comodin a 1 para los equipos desasignados
        if (equiposDesasignados.length > 0) {
            await Equipo.update(
                { comodin: 1 }, // Desasignado, comodin debe ser 1
                {
                    where: {
                        id: equiposDesasignados
                    },
                    transaction
                }
            );
        }

        // 2. Cambiar `comodin` a 0 para los nuevos equipos asignados
        await Equipo.update(
            { comodin: 0 }, // Asignado, `comodin` debe ser 0
            {
                where: {
                    id: equiposArray
                },
                transaction
            }
        );

        // 3. Eliminar asignaciones anteriores para el comercio
        await Asignacion.destroy({
            where: {
                idComercio: idComercio,
                idServicio: idServicio,
                idEstado: idEstado
            },
            transaction
        });

        // 4. Crear nuevas asignaciones para los equipos proporcionados
        for (let equipoData of equiposArray) {
            await Asignacion.create({
                idComercio: idComercio,
                idEquipo: equipoData,
                idEstado: idEstado,
                tipoProblema: tipoProblema,
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

module.exports = {
    getAllAsignacion,
    getAsignacionById,
    createAsignacion,
    updateAsignacion,
    deleteAsignacion,
    getAllByComercioEstadoServicio,
    updateAsignacionConTransaccion,
}