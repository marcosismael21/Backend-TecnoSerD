const db = require('../models')

const {
    sequelize
} = require("../models");

const {
    QueryTypes,
    Transaction,
    where
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

module.exports = {
    getAllAsignacionEspera,
}