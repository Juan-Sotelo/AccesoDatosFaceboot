const UsuariosDAO= require('../DAOs/UsuariosDAO');
const Usuario = require('../models/Usuario');
require('../database/database');


class ControladorUsuario {

    static async addUsuario(req, res) {
        try {
            const nuevoUsuario = new Usuario({
                username: req.body.username,
                contrasenia: req.body.contrasenia,
                sexo: req.body.sexo,
                fechaNacimiento: req.body.fechaNacimiento
            })

            const usuarioObjeto = await UsuariosDAO.registrar(nuevoUsuario);
            res.status(401).json(usuarioObjeto);
        } catch (error) {
            res.status(500).json({ error: 'Error al intentar agregar un usuario' })
        }
    }

    static async updateUsuario(req, res){
        const usuarioId= req.params.id;

        try{
            const usuario= await UsuariosDAO.obtenerPorId(usuarioId);
            
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
        }
    }

    static async loginUsuario(req, res){

        try{
            const {username, contrasenia}= req.body; 

            const usuario= await UsuariosDAO.obtenerRegistrado(username, contrasenia);

            if(!usuario){
                return res.status(401).json({error: 'Usuario inexistente'});
            }

        }catch(err){
            res.status(500).json({error: 'Error al iniciar sesión'});
        }
    }

}

module.exports= ControladorUsuario;