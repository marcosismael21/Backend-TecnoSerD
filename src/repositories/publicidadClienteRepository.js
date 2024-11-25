const db = require("../models")
const PublicidadCliente = db.publicidadComercio
const PublicidadRegalia = db.PublicidadRegalia

const {
    sequelize
} = require("../models");
const {
    QueryTypes,
    Transaction,
} = require('sequelize');

const getAllPublicidadCliente = async () => {
    try {
        const publicidadComercio = await PublicidadCliente.findAll()
        return publicidadComercio;
    } catch (error) {
        throw error
    }
}

const getPublicidadClienteById = async (id) => {
    try {
        const publicidadComercio = await PublicidadCliente.findOne({
            where: {
                id: id
            }
        })
        return publicidadComercio;
    } catch (error) {
        throw error
    }
}

const createPublicidadCliente = async (data) => {

    const {
        idPublicidadRegalia,
        cantidad
    } = data

    const transaction = await db.sequelize.transaction(); // Iniciar transacción

    try {

        // Obtener el registro actual de PublicidadRegalia
        const publicidadRegalia = await PublicidadRegalia.findOne({
            where: {
                id: idPublicidadRegalia
            },
            transaction
        });

        // Validar si la cantidad solicitada excede la cantidad disponible
        if (!publicidadRegalia || publicidadRegalia.cantidad < cantidad) {
            throw new Error('No puedes restar más de lo disponible');
        }


        const publicidadComercio = await PublicidadCliente.create(data, { transaction })

        await PublicidadRegalia.decrement(
            { cantidad: cantidad }, // Cantidad a decrementar
            {
                where: {
                    id: idPublicidadRegalia
                },
                transaction
            }
        )

        // Confirmar transacción si todo sale bien
        await transaction.commit();

        return publicidadComercio
    } catch (error) {
        // Revertir transacción si algo falla
        await transaction.rollback();
        throw error
    }
}

const updatePublicidadCliente = async (data, id) => {
    const transaction = await db.sequelize.transaction();

    try {
        // Obtener el registro actual antes de la actualización
        const publicidadClienteActual = await PublicidadCliente.findOne({
            where: { id },
            transaction
        });

        if (!publicidadClienteActual) {
            throw new Error('No se encontró el registro de PublicidadCliente');
        }

        // Obtener los valores actuales
        const cantidadAnterior = publicidadClienteActual.cantidad;
        const idPublicidadRegaliaAnterior = publicidadClienteActual.idPublicidadRegalia;

        // Obtener los nuevos valores del data
        const cantidadNueva = data.cantidad || cantidadAnterior;
        const idPublicidadRegaliaNuevo = data.idPublicidadRegalia || idPublicidadRegaliaAnterior;

        // Si se está cambiando la PublicidadRegalia
        if (idPublicidadRegaliaNuevo !== idPublicidadRegaliaAnterior) {
            // Devolver la cantidad a la PublicidadRegalia anterior
            await PublicidadRegalia.increment(
                { cantidad: cantidadAnterior },
                {
                    where: { id: idPublicidadRegaliaAnterior },
                    transaction
                }
            );

            // Verificar disponibilidad en la nueva PublicidadRegalia
            const nuevaPublicidadRegalia = await PublicidadRegalia.findOne({
                where: { id: idPublicidadRegaliaNuevo },
                transaction
            });

            if (!nuevaPublicidadRegalia || nuevaPublicidadRegalia.cantidad < cantidadNueva) {
                throw new Error('No hay suficiente cantidad disponible en la nueva PublicidadRegalia');
            }

            // Restar la cantidad de la nueva PublicidadRegalia
            await PublicidadRegalia.decrement(
                { cantidad: cantidadNueva },
                {
                    where: { id: idPublicidadRegaliaNuevo },
                    transaction
                }
            );
        }
        // Si solo se está modificando la cantidad en la misma PublicidadRegalia
        else if (cantidadNueva !== cantidadAnterior) {
            const diferencia = cantidadNueva - cantidadAnterior;

            if (diferencia > 0) {
                // Si la nueva cantidad es mayor, verificar disponibilidad
                const publicidadRegalia = await PublicidadRegalia.findOne({
                    where: { id: idPublicidadRegaliaAnterior },
                    transaction
                });

                if (!publicidadRegalia || publicidadRegalia.cantidad < diferencia) {
                    throw new Error('No hay suficiente cantidad disponible para el incremento');
                }

                // Restar la diferencia adicional
                await PublicidadRegalia.decrement(
                    { cantidad: diferencia },
                    {
                        where: { id: idPublicidadRegaliaAnterior },
                        transaction
                    }
                );
            } else {
                // Si la nueva cantidad es menor, devolver la diferencia
                await PublicidadRegalia.increment(
                    { cantidad: Math.abs(diferencia) },
                    {
                        where: { id: idPublicidadRegaliaAnterior },
                        transaction
                    }
                );
            }
        }

        // Actualizar el registro de PublicidadCliente
        const publicidadComercio = await PublicidadCliente.update(data, {
            where: { id },
            transaction
        });

        await transaction.commit();
        return publicidadComercio;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const deletePublicidadCliente = async (id) => {
    try {
        const publicidadComercio = await PublicidadCliente.destroy({
            where: {
                id: id
            }
        })
        return publicidadComercio
    } catch (error) {
        throw error
    }
}

const getAllPublicidadRegaliaByIdUsuario = async (idUsuario) => {
    try {
        const sql = `
                SELECT 
                    pc.id AS id,
                    pc.idPublicidadRegalia,
                    pc.idComercio,
                    c.nombreComercio,
                    pc.cantidad,
                    pc.estado,
	                CONCAT( pr.nombre, ' - ', tc.nombre ) AS nombrePublicidadRegalia
                FROM 
                    asignaciontecnicos at
                JOIN 
                    asignacions a ON at.idAsignacion = a.id
                JOIN 
                    publicidadcomercios pc ON a.idComercio = pc.idComercio
                JOIN 
                    comercios c ON pc.idComercio = c.id
                JOIN 
                    tipocomercios tc ON c.idTipoComercio = tc.id
	            JOIN 
                    publicidadregalia pr ON pc.idPublicidadRegalia = pr.id
                WHERE 
                    pc.estado = 0
                    AND at.idEstado = 2
                    AND a.idEstado = 2
                    AND at.idUsuario = :xusuario
                GROUP BY 
                    pc.id;`

        const asignacion = await sequelize.query(sql, {
            replacements: {
                xusuario: idUsuario,
            },
            type: QueryTypes.SELECT
        })
        return asignacion
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPublicidadCliente,
    getPublicidadClienteById,
    createPublicidadCliente,
    updatePublicidadCliente,
    deletePublicidadCliente,
    getAllPublicidadRegaliaByIdUsuario,
}