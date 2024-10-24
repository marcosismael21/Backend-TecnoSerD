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
        const ru= `SELECT 
    at.*, 
    u.nombres AS idUsuario, 
    c.nombreComercio AS idComercio, 
    s.nombre AS idServicio, 
    e.idTipoEquipo AS idEquipo,
    te.nombre AS tipoEquipo,
    est.nombre AS idEstado
FROM 
    asignaciontecnicos at
JOIN 
    usuarios u ON at.idUsuario = u.id
JOIN 
    asignacions a ON at.idAsignacion = a.id
JOIN 
    comercios c ON a.idComercio = c.id
JOIN 
    servicios s ON a.idServicio = s.id
JOIN 
    equipos e ON a.idEquipo = e.id
JOIN 
    tipoequipos te ON e.idTipoEquipo = te.id
JOIN 
    estados est ON at.idEstado = est.id;`
    const asignacionTecnico = await sequelize.query(ru, {
        type: QueryTypes.SELECT
    })
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
                idEstado: idEstado
            }, { transaction });

            // Agregar el registro creado al array asig
            asig.push(asignacionTecnico);
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

module.exports = {
    getAllAsignacionTecnico,
    getAsignacionTecnicoById,
    createAsignacionTecnico,
    updateAsignacionTecnico,
    deleteAsignacionTecnico,
    createAsignacionTecnicoTransaction,
}