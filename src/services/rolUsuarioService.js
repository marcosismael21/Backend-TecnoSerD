const rolUsuarioRepository = require('../repositories/rolUsuarioRepository')

const getAllRolUsuario = async () => {
    try {
        const rolUsuario = await rolUsuarioRepository.getAllRolUsuario()
        return (rolUsuario) ? rolUsuario : []
    } catch (error) {
        throw error
    }
}

const getRolUsuarioById = async (id) => {
    try {
        const rolUsuario = await rolUsuarioRepository.getRolUsuarioById(id)
        return (rolUsuario) ? rolUsuario : []
    } catch (error) {
        throw error
    }
}

const createRolUsuario = async (data) => {
    try {
        const rolUsuario = await rolUsuarioRepository.createRolUsuario(data)
        return (rolUsuario) ? rolUsuario : []
    } catch (error) {
        throw error
    }
}

const updateRolUsuario = async (data, id) => {
    try {
        const rolUsuario = await rolUsuarioRepository.updateRolUsuario(data, id)
        return (rolUsuario) ? rolUsuario : []
    } catch (error) {
        throw error
    }
}

const deleteRolUsuario = async (id) => {
    try {
        const rolUsuario = await rolUsuarioRepository.deleteRolUsuario(id)
        return (rolUsuario) ? rolUsuario : []
    } catch (error) {
        throw error
    }
}



module.exports = {
    getAllRolUsuario,
    getRolUsuarioById,
    createRolUsuario,
    updateRolUsuario,
    deleteRolUsuario
}