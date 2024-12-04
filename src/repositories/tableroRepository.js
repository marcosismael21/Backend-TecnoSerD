const db = require('../models')

const { sequelize, QueryTypes } = require('../models')

// 1. Sparkline: Tendencia de equipos instalados diariamente
const getSparklineInstalaciones = async () => {
    try {
        const query = `
            SELECT DATE(updatedAt) AS fecha, COUNT(id) AS cantidad
            FROM asignacions
            WHERE idServicio IN (1, 2) AND idEstado = 4 AND DATE(updatedAt) = '2024-12-04'
            GROUP BY DATE(updatedAt)
            ORDER BY fecha;
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
            SELECT DATE(updatedAt) AS fecha, COUNT(id) AS cantidad
            FROM asignacions
            WHERE idServicio IN (3, 4) AND idEstado = 3 AND DATE(updatedAt) = '2024-11-05'
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
            SELECT DATE(updatedAt) AS fecha, COUNT(id) AS cantidad
            FROM asignacions
            WHERE idServicio IN (5, 6) AND idEstado = 3 AND DATE(updatedAt) = '2024-11-05'
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
            SELECT c.nombre, s.nombre AS servicio, COUNT(a.id) AS cantidad
            FROM Asignacions a
            LEFT JOIN Servicios s ON a.idServicio = s.id
            LEFT JOIN Comercios co ON a.idComercio = co.id
            LEFT JOIN Ciudads c ON co.idCiudad = c.id
            WHERE a.idEstado = 4
            GROUP BY c.nombre, s.nombre;
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
            SELECT idEstado, COUNT(id) AS cantidad
            FROM asignacions
            GROUP BY idEstado;
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
                CASE 
                    WHEN a.idEstado = 1 THEN 'Instalado'
                    WHEN a.idEstado = 2 THEN 'Soporte Técnico'
                    WHEN a.idEstado = 3 THEN 'Retirado'
                    ELSE 'Otro'
                END AS estado,
                COUNT(e.id) AS cantidad
            FROM Equipos e
            INNER JOIN Asignacions a ON e.id = a.idEquipo
            GROUP BY a.idEstado;
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
            SELECT estado, COUNT(*) AS cantidad
            FROM Equipos
            GROUP BY estado;
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