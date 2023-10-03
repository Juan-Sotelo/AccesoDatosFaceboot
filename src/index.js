require('./database/database')
const UsuariosDAO = require('./DAOs/UsuariosDAO')
const mongoose = require('mongoose')

const usuarioPrueba = {
    username: 'carlos',
    contrasenia: 'prueba',
    sexo: 'masculino',
    fechaNacimiento: '2002-02-02'
};

prueba();

async function prueba(){
    try {
        usuarioRegistrado = await UsuariosDAO.registrar(usuarioPrueba);
        console.log(usuarioRegistrado);
    } catch (error) {
        throw error;
    }

    try {
        usuariObtenido = await UsuariosDAO.obtenerPorUsername(usuarioRegistrado.username)
        console.log(usuariObtenido);
    } catch (error) {
        throw error;
    }
    
    try {
        usuariObtenido = await UsuariosDAO.obtenerPorId(usuarioRegistrado._id);
        console.log(usuariObtenido);
    } catch (error) {
        throw error;
    }
}
