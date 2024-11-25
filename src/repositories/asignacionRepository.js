const db = require('../models')
const Asignacion = db.Asignacion
const Equipo = db.Equipo

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction,
} = require('sequelize');

const getAllAsignacion = async () => {
    try {
        const sql = `
            SELECT
	            asig.idComercio,
	            asig.idServicio,
	            asig.idEstado,
	            co.nombreComercio AS nomComercio,
                ciu.nombre AS ciudad,
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
                LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
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
	            es.nombre,
                ciu.nombre;`

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
                co.nombreComercio AS nomComercio,
                co.longitud,
                co.latitud,
                CONCAT(se.nombre, ' ', ca.nombre) AS servicio,
                asig.tipoProblema,
                asig.interpretacion,
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
                asig.interpretacion,
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
    const {
        idEquipo
    } = data
    const transaction = await db.sequelize.transaction(); // Iniciar transacción
    try {
        const asignacion = await Asignacion.create(data, { transaction })
        await Equipo.update({
            comodin: 0
        },
            {
                where: {
                    id: idEquipo
                },
                transaction
            });

        await transaction.commit(); // Confirmar transacción
        return asignacion
    } catch (error) {
        await transaction.rollback(); // Revertir transacción si algo falla
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
        interpretacion,
        idComercioAnterior, // Añadir el idComercio anterior
        idServicioAnterior // Añadir el idServicio anterior
    } = data;

    const transaction = await db.sequelize.transaction(); // Iniciar transacción

    try {
        // Obtener los equipos actualmente asignados al comercio y servicio anteriores
        const equiposAsignadosAnteriormente = await Asignacion.findAll({
            where: {
                idComercio: idComercioAnterior, // Usar idComercioAnterior
                idServicio: idServicioAnterior, // Usar idServicioAnterior
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

        // 3. Eliminar asignaciones anteriores para el comercio y servicio anteriores
        await Asignacion.destroy({
            where: {
                idComercio: idComercioAnterior, // Usar idComercioAnterior
                idServicio: idServicioAnterior, // Usar idServicioAnterior
                idEstado: idEstado
            },
            transaction
        });

        // 4. Crear nuevas asignaciones para los equipos proporcionados con el nuevo idComercio y idServicio
        for (let equipoData of equiposArray) {
            await Asignacion.create({
                idComercio: idComercio, // Usar el nuevo idComercio
                idEquipo: equipoData,
                idEstado: idEstado,
                tipoProblema: tipoProblema,
                interpretacion: interpretacion,
                idServicio: idServicio // Usar el nuevo idServicio
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


const getAllAsignacionByIdEstado = async (idEstado) => {
    try {
        const sql = `
            SELECT
	            asig.idComercio,
	            asig.idServicio,
	            asig.idEstado,
	            co.nombreComercio AS nomComercio,
                ciu.nombre AS ciudad,
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
                LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
            WHERE
                asig.idEstado = :xestado
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
	            es.nombre,
                ciu.nombre;`

        const asignacion = await sequelize.query(sql, {
            replacements: {
                xestado: idEstado,
            },
            type: QueryTypes.SELECT
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

const deleteAsignacionTransaction = async (idComercio, idServicio, idEstado) => {
    const transaction = await db.sequelize.transaction(); // Iniciar transacción

    try {

        // Buscar todos los equipos que coincidan con esos parámetros
        const asignacionesEncontradas = await Asignacion.findAll({
            where: {
                idComercio: idComercio,
                idServicio: idServicio,
                idEstado: idEstado
            },
            attributes: ['idEquipo'],
            transaction
        });

        // Extraer los idEquipo
        const idEquipos = asignacionesEncontradas.map(asignacion => asignacion.idEquipo);

        // Actualizar el campo comodin de los equipos
        await Equipo.update(
            { comodin: 1 },
            {
                where: {
                    id: idEquipos
                },
                transaction
            }
        );

        await Asignacion.destroy({
            where: {
                idComercio: idComercio,
                idServicio: idServicio,
                idEstado: idEstado
            },
            transaction
        });

        // Confirmar transacción si todo sale bien
        await transaction.commit()

    } catch (error) {
        // Revertir transacción si algo falla
        await transaction.rollback()
        throw error
    }
}

module.exports = {
    getAllAsignacion,
    getAsignacionById,
    createAsignacion,
    updateAsignacion,
    deleteAsignacion,
    getAllByComercioEstadoServicio,
    updateAsignacionConTransaccion,
    getAllAsignacionByIdEstado,
    deleteAsignacionTransaction,
}