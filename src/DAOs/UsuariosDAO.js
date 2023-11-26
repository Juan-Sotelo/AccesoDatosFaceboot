//Alex García, Juan Sotelo, Carlos Valle
const Usuario = require('../models/Usuario')

class UsuariosDAO {

    static async registrar(usuario){
        try {
            const nuevoUsuario = new Usuario(usuario)
            return await nuevoUsuario.save()
        } catch (error) {
            throw error
        }
    }

    static async obtenerPorId(id) {
        try {
            const usuario = await Usuario.findOne({_id:id})
            return usuario
        } catch (error) {
            throw error
        }
    }

    static async obtenerPorUsername(username) {
        try {
            const usuario = await Usuario.findOne({username:username})
            return usuario
        } catch (error) {
            throw error
        }
    }

    static async obtenerPorUsertag(usertag) {
        try {
            const usuario = await Usuario.findOne({usertag:usertag})
            return usuario
        } catch (error) {
            throw error
        }
    }

    static async obtenerRegistrado(username, contrasenia) {
        try {
            const usuario = await Usuario.findOne({ username:username, contrasenia:contrasenia }, {'_id': 0})
            return usuario
        } catch (error) {
            throw error
        }
    }
    
    static async editar(usertag, nuevoUsuario) {
        try {
            const usuarioEditado = await Usuario.findOneAndUpdate({ usertag: usertag }, nuevoUsuario, { new: true });
            return usuarioEditado;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UsuariosDAO;