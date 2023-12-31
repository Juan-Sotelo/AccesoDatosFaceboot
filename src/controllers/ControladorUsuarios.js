const UsuariosDAO= require('../DAOs/UsuariosDAO');
const Usuario = require('../models/Usuario');
require('../database/database');


class ControladorUsuario {

    static async addUsuario(req, res) {
        try {
            const { usertag } = req.body;

            const usuarioExistente = await UsuariosDAO.obtenerPorUsertag(usertag);

            if(usuarioExistente) {
                return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
            }

            const usuarioObjeto = await UsuariosDAO.registrar(req.body);
            res.status(201).json(usuarioObjeto);
        } catch (error) {
            res.status(500).json({ error: 'Error al intentar agregar un usuario' })
        }
    }

    static async updateUsuario(req, res){
        const usuarioId= req.body.usertag;

        try{
            const usuario= await UsuariosDAO.obtenerPorUsertag(usuarioId);
            
            if(!usuario){
                return res.status(401).json({error: 'Usuario no encontrado.'});
            }

            if(req.body.username){
                usuario.username= req.body.username;
            }

            if(req.body.contrasenia){
                usuario.contrasenia= req.body.contrasenia;
            }

            if(req.body.sexo){
                usuario.sexo= req.body.sexo;
            }

            if(req.body.fechaNacimiento){
                usuario.fechaNacimiento= req.body.fechaNacimiento;
            }

            const usuarioEditado= await UsuariosDAO.editar(usuarioId, usuario);
            res.json(usuarioEditado);
        } catch(err){
            res.status(500).json({error: 'No se pudo editar el Usuario solicitado'});
            console.log(err);
        }
    }

    static async iniciarSesion(username, contrasenia) {
        try {
            
            const resultado = await UsuariosDAO.obtenerRegistrado(username, contrasenia);
            return resultado;
        } catch (err) {
            return { error: 'Error al iniciar sesión' };
        }
    }

    static async obtenerUsuario(req, res)  {
        try {
            const usertag = req.query.usertag;
            const resultado = await UsuariosDAO.obtenerPorUsertag(usertag);
            res.json(resultado);
            return resultado;    
        } catch (err) {
            return { error: 'Error obtener usuario' };
        }
    }


}

module.exports= ControladorUsuario;