const db = require('../models')
const AsignacionTecnico = db.AsignacionTecnico
const Asignacion = db.Asignacion

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction
} = require('sequelize');

const getAllAsignacionTecnico = async () => {
    try {
        const asignacionTecnico = await AsignacionTecnico.findAll()
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const getAsignacionTecnicoById = async (id) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.findOne({
            where: {
                id: id
            }
        })
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const createAsignacionTecnico = async (data) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.create(data)
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const updateAsignacionTecnico = async (data, id) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.update(data, {
            where: {
                id: id
            }
        })
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const deleteAsignacionTecnico = async (id) => {
    try {
        const asignacionTecnico = await AsignacionTecnico.destroy({
            where: {
                id: id
            }
        })
        return asignacionTecnico
    } catch (error) {
        throw error
    }
}

const createAsignacionTecnicoTransaction = async (idUsuario, idComercio, idEstado, idServicio) => {
    const transaction = await db.sequelize.transaction(); // Iniciar transacción
    let asig = []; // Variable para almacenar los datos de AsignacionTecnico

    try {
        // Buscar todas las asignaciones con los mismos idComercio, idEstado e idServicio
        const asignaciones = await Asignacion.findAll({
            where: {
                idComercio: idComercio,
                idEstado: idEstado,
                idServicio: idServicio
            },
            attributes: ['id'], // Solo necesitamos los IDs de las asignaciones
            transaction
        });

        // Verificar si hay asignaciones encontradas
        if (asignaciones.length === 0) {
            throw new Error('No se encontraron asignaciones con los parámetros proporcionados');
        }

        // Extraer los IDs de las asignaciones
        const asignacionIds = asignaciones.map(asignacion => asignacion.id);
        // Insertar los registros en la tabla AsignacionTecnico
        for (let idAsignacion of asignacionIds) {
            const asignacionTecnico = await AsignacionTecnico.create({
                idUsuario: idUsuario,
                idAsignacion: idAsignacion,
                idEstado: 2
            }, { transaction });

            // Agregar el registro creado al array asig
            asig.push(asignacionTecnico);
        }

        // Actualizar el idEstado de las asignaciones encontradas a 2
        await Asignacion.update(
            { idEstado: 2 },
            {
                where: {
                    id: asignacionIds
                },
                transaction
            }
        );

        // Confirmar transacción si todo sale bien
        await transaction.commit();
        return asig; // Retornar el array con los datos de AsignacionTecnico

    } catch (error) {
        // Revertir transacción si algo falla
        await transaction.rollback();
        throw error;
    }
}

const createMultipleAsignaciones = async (asignaciones) => {
    const transaction = await db.sequelize.transaction(); // Iniciar transacción
    let asig = []; // Variable para almacenar los datos de AsignacionTecnico

    try {
        for (let asignacion of asignaciones) {
            const { idUsuario, idComercio, idEstado, idServicio } = asignacion;

            // Buscar todas las asignaciones con los mismos idComercio, idEstado e idServicio
            const asignacionesEncontradas = await Asignacion.findAll({
                where: {
                    idComercio: idComercio,
                    idEstado: idEstado,
                    idServicio: idServicio
                },
                attributes: ['id'], // Solo necesitamos los IDs de las asignaciones
                transaction
            });

            // Verificar si hay asignaciones encontradas
            if (asignacionesEncontradas.length === 0) {
                throw new Error(`No se encontraron asignaciones con los parámetros proporcionados para idComercio: ${idComercio}, idEstado: ${idEstado}, idServicio: ${idServicio}`);
            }

            // Extraer los IDs de las asignaciones
            const asignacionIds = asignacionesEncontradas.map(asignacion => asignacion.id);

            // Insertar los registros en la tabla AsignacionTecnico con idEstado siempre como 2
            for (let idAsignacion of asignacionIds) {
                const asignacionTecnico = await AsignacionTecnico.create({
                    idUsuario: idUsuario,
                    idAsignacion: idAsignacion,
                    idEstado: 2 // idEstado siempre será 2
                }, { transaction });

                // Agregar el registro creado al array asig
                asig.push(asignacionTecnico);
            }
            // Actualizar el idEstado de las asignaciones encontradas a 2
            await Asignacion.update(
                { idEstado: 2 },
                {
                    where: {
                        id: asignacionIds
                    },
                    transaction
                }
            );
        }

        // Confirmar transacción si todo sale bien
        await transaction.commit();
        return asig; // Retornar el array con los datos de AsignacionTecnico

    } catch (error) {
        // Revertir transacción si algo falla
        await transaction.rollback();
        throw error;
    }
}

const getAllAsignacionTecnicoSQL = async (idEstado) => {
    try {
        const sql = `
            SELECT AT
	          .idUsuario,
	          u.nombres AS tecnico,
	          GROUP_CONCAT( AT.idAsignacion SEPARATOR ', ' ) AS listAsignacionId,
	          co.id AS idComercio,
	          co.nombreComercio AS nomComercio,
	          co.longitud,
	          co.latitud,
	          ciu.nombre AS ciudad,
	          se.id AS idServicio,
	          se.nombre AS servicio,
	          ca.nombre AS canal,
	          es.id AS idEstado,
	          es.nombre AS estado 
            FROM
	          asignaciontecnicos
	          AS AT LEFT JOIN asignacions AS asig ON asig.id = AT.idAsignacion
	          LEFT JOIN comercios AS co ON co.id = asig.idComercio
	          LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
	          LEFT JOIN servicios AS se ON se.id = asig.idServicio
	          LEFT JOIN estados AS es ON es.id = AT.idEstado
	          LEFT JOIN canals AS ca ON ca.id = se.idcanal
	          LEFT JOIN usuarios AS u ON u.id = AT.idUsuario 
            WHERE
	          AT.idEstado = :xestado
            GROUP BY
	          AT.idUsuario,
	          u.nombres,
	          co.id,
	          co.nombreComercio,
	          co.longitud,
	          co.latitud,
	          ciu.nombre,
	          se.id,
	          se.nombre,
	          ca.nombre,
	          es.id,
	          es.nombre;`

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

const getAllByTecnicoComercioEstadoServicio = async (idUsuario, idComercio, idEstado, idServicio) => {
    try {
        const sql = `
            SELECT
                at.idUsuario,
                u.nombres AS tecnico,
                GROUP_CONCAT(at.idAsignacion SEPARATOR ', ') AS listAsignacionId,
                co.id AS idComercio,
                co.nombreComercio AS nomComercio,
                co.longitud,
                co.latitud,
                ciu.nombre AS ciudad,
                se.id AS idServicio,
                se.nombre AS servicio,
                ca.nombre AS canal,
                es.id AS idEstado,
                es.nombre AS estado,
                asig.tipoProblema,
                asig.interpretacion,
                GROUP_CONCAT(ti.nombre SEPARATOR ', ') AS listEquipos
            FROM
                asignaciontecnicos AS at
                LEFT JOIN asignacions AS asig ON asig.id = at.idAsignacion
                LEFT JOIN comercios AS co ON co.id = asig.idComercio
                LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
                LEFT JOIN servicios AS se ON se.id = asig.idServicio
                LEFT JOIN estados AS es ON es.id = at.idEstado
                LEFT JOIN canals AS ca ON ca.id = se.idcanal
                LEFT JOIN usuarios AS u ON u.id = at.idUsuario
                LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
                LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo
            WHERE
                at.idEstado = asig.idEstado
                AND at.idUsuario = :xusuario
                AND co.id = :xcomercio
                AND se.id = :xservicio
                AND es.id = :xestado
            GROUP BY
                at.idUsuario,
                u.nombres,
                co.id,
                co.nombreComercio,
                co.longitud,
                co.latitud,
                ciu.nombre,
                se.id,
                se.nombre,
                ca.nombre,
                es.id,
                es.nombre,
                asig.tipoProblema,
                asig.interpretacion;`

        const asignacion = await sequelize.query(sql, {
            replacements: {
                xusuario: idUsuario,
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

const cancelarAsignacion = async (idUsuario, idComercio, idServicio, idEstado) => {
    const transaction = await db.sequelize.transaction(); // Iniciar transacción

    try {
        // Buscar todas las asignaciones que coincidan con idComercio, idServicio y idEstado
        const asignacionesEncontradas = await Asignacion.findAll({
            where: {
                idComercio: idComercio,
                idServicio: idServicio,
                idEstado: idEstado
            },
            attributes: ['id'], // Solo necesitamos los IDs de las asignaciones
            transaction
        });

        // Verificar si hay asignaciones encontradas
        if (asignacionesEncontradas.length === 0) {
            throw new Error(`No se encontraron asignaciones con los parámetros proporcionados para idComercio: ${idComercio}, idServicio: ${idServicio}, idEstado: ${idEstado}`);
        }

        // Extraer los IDs de las asignaciones
        const asignacionIds = asignacionesEncontradas.map(asignacion => asignacion.id);

        // Eliminar las asignaciones tecnicas encontradas
        await AsignacionTecnico.destroy({
            where: {
                idUsuario: idUsuario,
                idAsignacion: asignacionIds,
                idEstado: idEstado
            },
            transaction
        });

        // Actualizar el idEstado de las asignaciones encontradas a 1
        await Asignacion.update(
            { idEstado: 1 },
            {
                where: {
                    id: asignacionIds
                },
                transaction
            }
        );

        // Confirmar transacción si todo sale bien
        await transaction.commit();
        return { message: 'Ténico quitado y estados actualizados correctamente' };

    } catch (error) {
        // Revertir transacción si algo falla
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    getAllAsignacionTecnico,
    getAsignacionTecnicoById,
    createAsignacionTecnico,
    updateAsignacionTecnico,
    deleteAsignacionTecnico,
    createAsignacionTecnicoTransaction,
    createMultipleAsignaciones,
    getAllAsignacionTecnicoSQL,
    getAllByTecnicoComercioEstadoServicio,
    cancelarAsignacion,
}