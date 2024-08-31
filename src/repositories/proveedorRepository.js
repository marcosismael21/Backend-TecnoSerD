const db = require('../models')
const Proveedor = db.Proveedor

const getAllProveedor = async () => {
    try {
        const proveedor = await Proveedor.findAll()
        return proveedor
    } catch (error) {
        throw error
    }
}

const getProveedorById = async (id) => {
    try {
        const proveedor = await Proveedor.findOne({
            where: {
                id: id
            }
        })
        return proveedor
    } catch (error) {
        throw error
    }
}

const createProveedor = async (data) => {
    try {
        const proveedor = await Proveedor.create(data)
        return proveedor
    } catch (error) {
        throw error
    }
}

const updateProveedor = async (data, id) => {
    try {
        const proveedor = await Proveedor.update(data, {
            where: {
                id: id
            }
        })
        return proveedor
    } catch (error) {
        throw error
    }
}

const deleteProveedor = async (id) => {
    try {
        const proveedor = await Proveedor.destroy({
            where: {
                id: id
            }
        })
        return proveedor
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllProveedor,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
}