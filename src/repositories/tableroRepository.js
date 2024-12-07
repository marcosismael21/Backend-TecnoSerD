const db = require('../models')

const { sequelize, QueryTypes } = require('../models')

// 1. Sparkline: Tendencia de equipos instalados diariamente
const getSparklineInstalaciones = async () => {
    try {
        const query = `
            SELECT DATE(updatedAt) AS fecha, 
            COUNT(DISTINCT idComercio) AS cantidad
            FROM asignacions 
            WHERE
                idServicio IN (7, 8) 
                AND idEstado = 4 
                AND DATE(updatedAt) = CURRENT_DATE()
            GROUP BY
                DATE(updatedAt) 
            ORDER BY
                fecha
        `;
        const [results, metadata] = await sequelize.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

// 2. Sparkline: Tendencia de solicitudes de soporte atendidas diariamente
const getSparklineSoportes = async () => {
    try {
        const query = `
            SELECT DATE(updatedAt) AS fecha, 
            COUNT(DISTINCT idComercio) AS cantidad
            FROM asignacions
            WHERE idServicio IN (9, 10) 
                AND idEstado = 4 
                AND DATE(updatedAt) = CURRENT_DATE()
            GROUP BY DATE(updatedAt)
            ORDER BY fecha;
        `;
        const [results, metadata] = await sequelize.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

// 3. Sparkline: Tendencia de retiros de equipos diarios
const getSparklineRetiros = async () => {
    try {
        const query = `
            SELECT DATE(updatedAt) AS fecha,
            COUNT(DISTINCT idComercio) AS cantidad
            FROM asignacions
            WHERE idServicio IN (11, 12) AND idEstado = 4 AND DATE(updatedAt) = CURRENT_DATE()
            GROUP BY DATE(updatedAt)
            ORDER BY fecha;
        `;
        const [results, metadata] = await sequelize.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

// 4. Gráfico de Barras: Cantidad de servicios prestados por ciudad
const getServiciosPorCiudad = async () => {
    try {
        const query = `
            SELECT c.nombre, s.nombre AS servicio, COUNT(DISTINCT a.idComercio) AS cantidad
            FROM Asignacions a
            LEFT JOIN Servicios s ON a.idServicio = s.id
            LEFT JOIN Comercios co ON a.idComercio = co.id
            LEFT JOIN Ciudads c ON co.idCiudad = c.id
            WHERE a.idEstado = 4
            GROUP BY c.nombre, s.nombre
            ORDER BY c.nombre, s.nombre;
        `;
        const [results, metadata] = await sequelize.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

// 5. Gráfico Donut: Distribución de solicitudes de soporte por estado
const getAsignacionesPorEstado = async () => {
    try {
        const query = `
            SELECT 
            e.nombre AS estado,
            COUNT(DISTINCT a.idComercio) AS cantidad
            FROM asignacions a
            LEFT JOIN Estados e ON a.idEstado = e.id
            GROUP BY a.idEstado, e.nombre
            ORDER BY e.nombre;
        `;
        const [results, metadata] = await sequelize.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

// 6. Gráfico de Área: Crecimiento de la cantidad de equipos por estado
const getCrecimientoEquiposPorEstado = async () => {
    try {
        const query = `
            SELECT 
            e.nombre AS estado,
            COUNT(DISTINCT a.idEquipo) AS cantidad_equipos,
            COUNT(DISTINCT a.idComercio) AS cantidad_comercios,
            COUNT(a.id) as total_registros
            FROM Estados e
            LEFT JOIN Asignacions a ON e.id = a.idEstado
            WHERE DATE(a.updatedAt) = CURRENT_DATE()
            GROUP BY e.id, e.nombre
            ORDER BY e.id;
        `;
        const [results, metadata] = await sequelize.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

// 7. Gráfico de Pie: Distribución de equipos en buen y mal estado (ya existente)
const getCantidadEquiposPorEstado = async () => {
    try {
        const query = `
           SELECT 
            CASE estado
            WHEN 1 THEN 'Buen estado'
            WHEN 0 THEN 'Dañado'
            ELSE 'No definido'
            END AS estado,
            COUNT(*) AS cantidad
            FROM Equipos
            GROUP BY estado
            ORDER BY estado DESC;
        `;
        const [results, metadata] = await sequelize.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getSparklineInstalaciones,
    getSparklineSoportes,
    getSparklineRetiros,
    getServiciosPorCiudad,
    getAsignacionesPorEstado,
    getCrecimientoEquiposPorEstado,
    getCantidadEquiposPorEstado,
}