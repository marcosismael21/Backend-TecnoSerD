const db = require('../models');
const Servicio = db.Servicio;

const getAllServicio = async () => {
    try {
        const servicio = await Servicio.findAll();
        return servicio;
    } catch (error) {
        throw error;
    }
}

const getServicioById = async (id) => {
    try {
        const servicio = await Servicio.findOne({
            where: {
                id: id,
            }
        });
        return servicio;
    } catch (error) {
        throw error;
    }
}

const createServicio = async (data) => {
    try {
        const servicio = await Servicio.create(data);
        return servicio;
    } catch (error) {
        throw error;
    }
}

const updateServicio = async (data, id) => {
    try {
        const servicio = await Servicio.update(data, {
            where: {
                id: id,
            }
        });
        return servicio;
    } catch (error) {
        throw error;
    }
}

const deleteServicio = async (id) => {
    try {
        const servicio = await Servicio.destroy({
            where: {
                id: id,
            }
        });
        return servicio;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getAllServicio,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio,
}