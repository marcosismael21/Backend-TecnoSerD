const db = require('../models')

const {
    sequelize
} = require("../models");

const {
    QueryTypes,
    Transaction,
} = require('sequelize');

const getAllAsignacionEspera = async () => {
    try {
        const sql = `
            SELECT
              asig.idComercio,
	          asig.idServicio,
	          CONCAT( se.nombre, ' ', ca.nombre ) AS servicio,
	          asig.idEstado,
	          es.nombre AS estado,
	          co.nombreComercio AS nomComercio,
	          co.direccion,
	          co.numTienda,
	          co.numUsuario,
	          co.nombreContacto,
	          co.idTipoComercio,
	          tc.nombre AS tipoComercio,
	          ciu.nombre AS ciudad,
	          co.longitud,
	          co.latitud,
	          asig.tipoProblema,
	          asig.interpretacion,
	          GROUP_CONCAT( ti.nombre SEPARATOR ', ' ) AS listEquipos,
	          GROUP_CONCAT( eq.id SEPARATOR ', ' ) AS listEquiposIDs,
	          GROUP_CONCAT( eq.noserie SEPARATOR ', ' ) AS listNoSerie,
	          GROUP_CONCAT( eq.noimei SEPARATOR ', ' ) AS listNoIMEI,
	          GROUP_CONCAT( eq.puk SEPARATOR ', ' ) AS listPUK,
	          GROUP_CONCAT( eq.pin SEPARATOR ', ' ) AS listPIN 
            FROM
	          asignacions AS asig
	          LEFT JOIN comercios AS co ON co.id = asig.idComercio
	          LEFT JOIN servicios AS se ON se.id = asig.idServicio
	          LEFT JOIN estados AS es ON es.id = asig.idEstado
	          LEFT JOIN canals AS ca ON ca.id = se.idcanal
	          LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
	          LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo
	          LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
	          LEFT JOIN tipocomercios AS tc ON tc.id = co.idTipoComercio 
            WHERE
	          asig.idEstado = 1 
            GROUP BY
	          asig.idComercio,
	          asig.idServicio,
	          asig.idEstado,
	          asig.tipoProblema,
	          asig.interpretacion,
	          co.nombreComercio,
	          co.direccion,
	          co.numTienda,
	          co.numUsuario,
	          co.nombreContacto,
	          co.idTipoComercio,
	          tc.nombre,
	          co.longitud,
	          co.latitud,
	          se.nombre,
	          ca.nombre,
	          es.nombre,
	          ciu.nombre;`

        const reportes = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })

        return reportes
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByCiudad = async (idCiudad) => {
    try {
        const sql = `
            SELECT
				asig.idComercio,
				asig.idServicio,
				CONCAT( se.nombre, ' ', ca.nombre ) AS servicio,
				asig.idEstado,
				es.nombre AS estado,
				co.nombreComercio AS nomComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre AS tipoComercio,
				co.idCiudad,
				ciu.nombre AS ciudad,
				co.longitud,
				co.latitud,
				asig.tipoProblema,
				asig.interpretacion,
				GROUP_CONCAT( ti.nombre SEPARATOR ', ' ) AS listEquipos,
				GROUP_CONCAT( eq.id SEPARATOR ', ' ) AS listEquiposIDs,
				GROUP_CONCAT( eq.noserie SEPARATOR ', ' ) AS listNoSerie,
				GROUP_CONCAT( eq.noimei SEPARATOR ', ' ) AS listNoIMEI,
				GROUP_CONCAT( eq.puk SEPARATOR ', ' ) AS listPUK,
				GROUP_CONCAT( eq.pin SEPARATOR ', ' ) AS listPIN 
			FROM
				asignacions AS asig
				LEFT JOIN comercios AS co ON co.id = asig.idComercio
				LEFT JOIN servicios AS se ON se.id = asig.idServicio
				LEFT JOIN estados AS es ON es.id = asig.idEstado
				LEFT JOIN canals AS ca ON ca.id = se.idcanal
				LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
				LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo
				LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
				LEFT JOIN tipocomercios AS tc ON tc.id = co.idTipoComercio 
			WHERE
				asig.idEstado = 1 
				AND co.idCiudad = :xciudad 
			GROUP BY
				asig.idComercio,
				asig.idServicio,
				asig.idEstado,
				asig.tipoProblema,
				asig.interpretacion,
				co.nombreComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre,
				co.longitud,
				co.latitud,
				se.nombre,
				ca.nombre,
				es.nombre,
				ciu.nombre,
				co.idCiudad;`

        const reportes = await sequelize.query(sql, {
			replacements: {
                xciudad: idCiudad,
            },
            type: QueryTypes.SELECT
        })

        return reportes
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByServicio = async (idServicio) => {
    try {
        const sql = `
            SELECT
				asig.idComercio,
				asig.idServicio,
				CONCAT( se.nombre, ' ', ca.nombre ) AS servicio,
				asig.idEstado,
				es.nombre AS estado,
				co.nombreComercio AS nomComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre AS tipoComercio,
				co.idCiudad,
				ciu.nombre AS ciudad,
				co.longitud,
				co.latitud,
				asig.tipoProblema,
				asig.interpretacion,
				GROUP_CONCAT( ti.nombre SEPARATOR ', ' ) AS listEquipos,
				GROUP_CONCAT( eq.id SEPARATOR ', ' ) AS listEquiposIDs,
				GROUP_CONCAT( eq.noserie SEPARATOR ', ' ) AS listNoSerie,
				GROUP_CONCAT( eq.noimei SEPARATOR ', ' ) AS listNoIMEI,
				GROUP_CONCAT( eq.puk SEPARATOR ', ' ) AS listPUK,
				GROUP_CONCAT( eq.pin SEPARATOR ', ' ) AS listPIN 
			FROM
				asignacions AS asig
				LEFT JOIN comercios AS co ON co.id = asig.idComercio
				LEFT JOIN servicios AS se ON se.id = asig.idServicio
				LEFT JOIN estados AS es ON es.id = asig.idEstado
				LEFT JOIN canals AS ca ON ca.id = se.idcanal
				LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
				LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo
				LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
				LEFT JOIN tipocomercios AS tc ON tc.id = co.idTipoComercio 
			WHERE
				asig.idEstado = 1 
				AND asig.idServicio = :xservicio
			GROUP BY
				asig.idComercio,
				asig.idServicio,
				asig.idEstado,
				asig.tipoProblema,
				asig.interpretacion,
				co.nombreComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre,
				co.longitud,
				co.latitud,
				se.nombre,
				ca.nombre,
				es.nombre,
				ciu.nombre,
				co.idCiudad;`

        const reportes = await sequelize.query(sql, {
			replacements: {
                xservicio: idServicio,
            },
            type: QueryTypes.SELECT
        })

        return reportes
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByCiudadServicio = async (idCiudad, idServicio) => {
    try {
        const sql = `
            SELECT
				asig.idComercio,
				asig.idServicio,
				CONCAT( se.nombre, ' ', ca.nombre ) AS servicio,
				asig.idEstado,
				es.nombre AS estado,
				co.nombreComercio AS nomComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre AS tipoComercio,
				co.idCiudad,
				ciu.nombre AS ciudad,
				co.longitud,
				co.latitud,
				asig.tipoProblema,
				asig.interpretacion,
				GROUP_CONCAT( ti.nombre SEPARATOR ', ' ) AS listEquipos,
				GROUP_CONCAT( eq.id SEPARATOR ', ' ) AS listEquiposIDs,
				GROUP_CONCAT( eq.noserie SEPARATOR ', ' ) AS listNoSerie,
				GROUP_CONCAT( eq.noimei SEPARATOR ', ' ) AS listNoIMEI,
				GROUP_CONCAT( eq.puk SEPARATOR ', ' ) AS listPUK,
				GROUP_CONCAT( eq.pin SEPARATOR ', ' ) AS listPIN 
			FROM
				asignacions AS asig
				LEFT JOIN comercios AS co ON co.id = asig.idComercio
				LEFT JOIN servicios AS se ON se.id = asig.idServicio
				LEFT JOIN estados AS es ON es.id = asig.idEstado
				LEFT JOIN canals AS ca ON ca.id = se.idcanal
				LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
				LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo
				LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
				LEFT JOIN tipocomercios AS tc ON tc.id = co.idTipoComercio 
			WHERE
				asig.idEstado = 1 
				AND co.idCiudad = :xciudad
				AND asig.idServicio = :xservicio
			GROUP BY
				asig.idComercio,
				asig.idServicio,
				asig.idEstado,
				asig.tipoProblema,
				asig.interpretacion,
				co.nombreComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre,
				co.longitud,
				co.latitud,
				se.nombre,
				ca.nombre,
				es.nombre,
				ciu.nombre,
				co.idCiudad;`

        const reportes = await sequelize.query(sql, {
			replacements: {
                xciudad: idCiudad,
				xservicio: idServicio,
            },
            type: QueryTypes.SELECT
        })

        return reportes
    } catch (error) {
        throw error
    }
}

// reportes finalizados

const getAllAsignacionFinalizado = async () => {
    try {
        const sql = `
            SELECT
				asig.idComercio,
				asig.idServicio,
				DATE(asig.updatedAt) as fecha,
				CONCAT( se.nombre, ' ', ca.nombre ) AS servicio,
				asig.idEstado,
				es.nombre AS estado,
				co.nombreComercio AS nomComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre AS tipoComercio,
				ciu.nombre AS ciudad,
				co.longitud,
				co.latitud,
				asig.tipoProblema,
				asig.interpretacion,
				GROUP_CONCAT( ti.nombre SEPARATOR ', ' ) AS listEquipos,
				GROUP_CONCAT( eq.id SEPARATOR ', ' ) AS listEquiposIDs,
				GROUP_CONCAT( eq.noserie SEPARATOR ', ' ) AS listNoSerie,
				GROUP_CONCAT( eq.noimei SEPARATOR ', ' ) AS listNoIMEI,
				GROUP_CONCAT( eq.puk SEPARATOR ', ' ) AS listPUK,
				GROUP_CONCAT( eq.pin SEPARATOR ', ' ) AS listPIN 
			FROM
				asignacions AS asig
				LEFT JOIN comercios AS co ON co.id = asig.idComercio
				LEFT JOIN servicios AS se ON se.id = asig.idServicio
				LEFT JOIN estados AS es ON es.id = asig.idEstado
				LEFT JOIN canals AS ca ON ca.id = se.idcanal
				LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
				LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo
				LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
				LEFT JOIN tipocomercios AS tc ON tc.id = co.idTipoComercio 
			WHERE
				asig.idEstado = 4 
			GROUP BY
				asig.idComercio,
				asig.idServicio,
				DATE(asig.updatedAt),
				asig.idEstado,
				asig.tipoProblema,
				asig.interpretacion,
				co.nombreComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre,
				co.longitud,
				co.latitud,
				se.nombre,
				ca.nombre,
				es.nombre,
				ciu.nombre;`

        const reportes = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })

        return reportes
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByCiudadFinalizada = async (idCiudad) => {
    try {
        const sql = `
            SELECT
				asig.idComercio,
				asig.idServicio,
				DATE(asig.updatedAt) as fecha,
				CONCAT( se.nombre, ' ', ca.nombre ) AS servicio,
				asig.idEstado,
				es.nombre AS estado,
				co.nombreComercio AS nomComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre AS tipoComercio,
				co.idCiudad,
				ciu.nombre AS ciudad,
				co.longitud,
				co.latitud,
				asig.tipoProblema,
				asig.interpretacion,
				GROUP_CONCAT( ti.nombre SEPARATOR ', ' ) AS listEquipos,
				GROUP_CONCAT( eq.id SEPARATOR ', ' ) AS listEquiposIDs,
				GROUP_CONCAT( eq.noserie SEPARATOR ', ' ) AS listNoSerie,
				GROUP_CONCAT( eq.noimei SEPARATOR ', ' ) AS listNoIMEI,
				GROUP_CONCAT( eq.puk SEPARATOR ', ' ) AS listPUK,
				GROUP_CONCAT( eq.pin SEPARATOR ', ' ) AS listPIN 
			FROM
				asignacions AS asig
				LEFT JOIN comercios AS co ON co.id = asig.idComercio
				LEFT JOIN servicios AS se ON se.id = asig.idServicio
				LEFT JOIN estados AS es ON es.id = asig.idEstado
				LEFT JOIN canals AS ca ON ca.id = se.idcanal
				LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
				LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo
				LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
				LEFT JOIN tipocomercios AS tc ON tc.id = co.idTipoComercio 
			WHERE
				asig.idEstado = 4
				AND co.idCiudad = :xciudad 
			GROUP BY
				asig.idComercio,
				asig.idServicio,
				asig.idEstado,
				DATE(asig.updatedAt),
				asig.tipoProblema,
				asig.interpretacion,
				co.nombreComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre,
				co.longitud,
				co.latitud,
				se.nombre,
				ca.nombre,
				es.nombre,
				ciu.nombre,
				co.idCiudad;`

        const reportes = await sequelize.query(sql, {
			replacements: {
                xciudad: idCiudad,
            },
            type: QueryTypes.SELECT
        })

        return reportes
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByServicioFinalizada = async (idServicio) => {
    try {
        const sql = `
            SELECT
				asig.idComercio,
				asig.idServicio,
				DATE(asig.updatedAt) as fecha,
				CONCAT( se.nombre, ' ', ca.nombre ) AS servicio,
				asig.idEstado,
				es.nombre AS estado,
				co.nombreComercio AS nomComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre AS tipoComercio,
				co.idCiudad,
				ciu.nombre AS ciudad,
				co.longitud,
				co.latitud,
				asig.tipoProblema,
				asig.interpretacion,
				GROUP_CONCAT( ti.nombre SEPARATOR ', ' ) AS listEquipos,
				GROUP_CONCAT( eq.id SEPARATOR ', ' ) AS listEquiposIDs,
				GROUP_CONCAT( eq.noserie SEPARATOR ', ' ) AS listNoSerie,
				GROUP_CONCAT( eq.noimei SEPARATOR ', ' ) AS listNoIMEI,
				GROUP_CONCAT( eq.puk SEPARATOR ', ' ) AS listPUK,
				GROUP_CONCAT( eq.pin SEPARATOR ', ' ) AS listPIN 
			FROM
				asignacions AS asig
				LEFT JOIN comercios AS co ON co.id = asig.idComercio
				LEFT JOIN servicios AS se ON se.id = asig.idServicio
				LEFT JOIN estados AS es ON es.id = asig.idEstado
				LEFT JOIN canals AS ca ON ca.id = se.idcanal
				LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
				LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo
				LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
				LEFT JOIN tipocomercios AS tc ON tc.id = co.idTipoComercio 
			WHERE
				asig.idEstado = 4 
				AND asig.idServicio = :xservicio
			GROUP BY
				asig.idComercio,
				asig.idServicio,
				asig.idEstado,
				asig.tipoProblema,
				DATE(asig.updatedAt),
				asig.interpretacion,
				co.nombreComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre,
				co.longitud,
				co.latitud,
				se.nombre,
				ca.nombre,
				es.nombre,
				ciu.nombre,
				co.idCiudad;`

        const reportes = await sequelize.query(sql, {
			replacements: {
                xservicio: idServicio,
            },
            type: QueryTypes.SELECT
        })

        return reportes
    } catch (error) {
        throw error
    }
}

const getAllAsignacionEsperaByCiudadServicioFinalizada = async (idCiudad, idServicio) => {
    try {
        const sql = `
            SELECT
				asig.idComercio,
				asig.idServicio,
				DATE(asig.updatedAt) as fecha,
				CONCAT( se.nombre, ' ', ca.nombre ) AS servicio,
				asig.idEstado,
				es.nombre AS estado,
				co.nombreComercio AS nomComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre AS tipoComercio,
				co.idCiudad,
				ciu.nombre AS ciudad,
				co.longitud,
				co.latitud,
				asig.tipoProblema,
				asig.interpretacion,
				GROUP_CONCAT( ti.nombre SEPARATOR ', ' ) AS listEquipos,
				GROUP_CONCAT( eq.id SEPARATOR ', ' ) AS listEquiposIDs,
				GROUP_CONCAT( eq.noserie SEPARATOR ', ' ) AS listNoSerie,
				GROUP_CONCAT( eq.noimei SEPARATOR ', ' ) AS listNoIMEI,
				GROUP_CONCAT( eq.puk SEPARATOR ', ' ) AS listPUK,
				GROUP_CONCAT( eq.pin SEPARATOR ', ' ) AS listPIN 
			FROM
				asignacions AS asig
				LEFT JOIN comercios AS co ON co.id = asig.idComercio
				LEFT JOIN servicios AS se ON se.id = asig.idServicio
				LEFT JOIN estados AS es ON es.id = asig.idEstado
				LEFT JOIN canals AS ca ON ca.id = se.idcanal
				LEFT JOIN equipos AS eq ON eq.id = asig.idEquipo
				LEFT JOIN tipoequipos AS ti ON ti.id = eq.idTipoEquipo
				LEFT JOIN ciudads AS ciu ON ciu.id = co.idCiudad
				LEFT JOIN tipocomercios AS tc ON tc.id = co.idTipoComercio 
			WHERE
				asig.idEstado = 4
				AND co.idCiudad = :xciudad
				AND asig.idServicio = :xservicio
			GROUP BY
				asig.idComercio,
				asig.idServicio,
				DATE(asig.updatedAt),
				asig.idEstado,
				asig.tipoProblema,
				asig.interpretacion,
				co.nombreComercio,
				co.direccion,
				co.numTienda,
				co.numUsuario,
				co.nombreContacto,
				co.idTipoComercio,
				tc.nombre,
				co.longitud,
				co.latitud,
				se.nombre,
				ca.nombre,
				es.nombre,
				ciu.nombre,
				co.idCiudad;`

        const reportes = await sequelize.query(sql, {
			replacements: {
                xciudad: idCiudad,
				xservicio: idServicio,
            },
            type: QueryTypes.SELECT
        })

        return reportes
    } catch (error) {
        throw error
    }
}

const getAllEquiposMalEstadobyFechaInicialFechaFinal = async (fechaInicial, fechaFinal) => {
    try {
        const sql = `
            SELECT
    co.id AS idComercio,
    co.nombreComercio,
    co.direccion,
    co.numTienda,
    co.nombreContacto,
    co.numUsuario,
    ciu.nombre AS ciudad,
    tc.nombre AS tipoComercio,
    GROUP_CONCAT(
        DISTINCT
        CASE WHEN eq.estado = 1 THEN 
            CASE 
                WHEN ti.id IN (9, 10) THEN CONCAT(ti.nombre, ' (PIN:', eq.pin, ' PUK:', eq.puk, ')')
                WHEN ti.id IN (3, 4) THEN CONCAT(ti.nombre, ' (Serie:', eq.noserie, ' IMEI:', eq.noimei, ')')
                ELSE CONCAT(ti.nombre, ' (Serie:', eq.noserie, ')')
            END
        END
        SEPARATOR ', '
    ) AS equipos_buen_estado,
    COUNT(DISTINCT CASE WHEN eq.estado = 1 THEN eq.id END) AS total_buen_estado,
    GROUP_CONCAT(
        DISTINCT
        CASE WHEN eq.estado = 0 THEN 
            CASE 
                WHEN ti.id IN (9, 10) THEN CONCAT(ti.nombre, ' (PIN:', eq.pin, ' PUK:', eq.puk, ')')
                WHEN ti.id IN (3, 4) THEN CONCAT(ti.nombre, ' (Serie:', eq.noserie, ' IMEI:', eq.noimei, ')')
                ELSE CONCAT(ti.nombre, ' (Serie:', eq.noserie, ')')
            END
        END
        SEPARATOR ', '
    ) AS equipos_danados,
    COUNT(DISTINCT CASE WHEN eq.estado = 0 THEN eq.id END) AS total_danados,
    DATE(asig.updatedAt) as fecha_actualizacion
FROM 
    comercios co
    LEFT JOIN asignacions asig ON asig.idComercio = co.id
    LEFT JOIN equipos eq ON eq.id = asig.idEquipo
    LEFT JOIN tipoequipos ti ON ti.id = eq.idTipoEquipo
    LEFT JOIN ciudads ciu ON ciu.id = co.idCiudad
    LEFT JOIN tipocomercios tc ON tc.id = co.idTipoComercio
WHERE 
    asig.idEstado = 4
    AND DATE(asig.updatedAt) BETWEEN :xfechaInicial AND :xfechaFinal
GROUP BY 
    co.id,
    co.nombreComercio,
    co.direccion,
    co.numTienda,
    co.nombreContacto,
    co.numUsuario,
    ciu.nombre,
    tc.nombre,
    DATE(asig.updatedAt)
HAVING 
    total_danados > 0  -- Solo comercios que tienen equipos dañados
ORDER BY 
    co.nombreComercio,
    fecha_actualizacion;`
				
        const reportes = await sequelize.query(sql, {
            replacements: {
                xfechaInicial: fechaInicial,
                xfechaFinal: fechaFinal
            },
            type: QueryTypes.SELECT
        })
        return reportes
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllAsignacionEspera,
	getAllAsignacionEsperaByCiudad,
	getAllAsignacionEsperaByServicio,
	getAllAsignacionEsperaByCiudadServicio,
	getAllAsignacionFinalizado,
	getAllAsignacionEsperaByCiudadFinalizada,
	getAllAsignacionEsperaByServicioFinalizada,
	getAllAsignacionEsperaByCiudadServicioFinalizada,
	getAllEquiposMalEstadobyFechaInicialFechaFinal,
}