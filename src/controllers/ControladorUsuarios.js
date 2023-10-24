const UsuariosDAO = require('../DAOs/UsuariosDAO');
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb://127.0.0.1/faceboot'

exports.iniciarSesion= async (username, contrasenia) => {
    try{
        await mongoose.connect(MONGO_URI);
        resultado= await UsuariosDAO.obtenerRegistrado(username, contrasenia);
        mongoose.connection.close();
        return resultado;
    }catch (err){
        return err;
    }
};

exports.registrarUsuario= async (usuario) => {
    try{
        await mongoose.connect(MONGO_URI);
        resultado= await UsuariosDAO.registrar(usuario);
        mongoose.connection.close();
        return resultado;
    }catch (err){
        return err;
    }
};

exports.eliminarUsuario= async (username) => {
    try{
        await mongoose.connect(MONGO_URI);
        resultado= await UsuariosDAO.eliminarPorUsername(username);
        mongoose.connection.close();
        return resultado;
    }catch (err){
        return err;
    }
};

exports.editarUsuario= async (id, usuario) => {
    try{
        await mongoose.connect(MONGO_URI);
        resultado= await UsuariosDAO.editar(id, usuario);
        mongoose.connection.close();
        return resultado;
    }catch (error){
        return error;
    }
}

exports.actualizarUsuario= async (usernameActual, usuario) => {
    try{
        await mongoose.connect(MONGO_URI);
        resultado= await UsuariosDAO.editarPorUsername(usernameActual, usuario);
        mongoose.connection.close();
        return resultado;
    }catch (err){
        return err;
    }
};