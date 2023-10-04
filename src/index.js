//Alex García, Juan Sotelo, Carlos Valle
require('./database/database');
const readline = require('readline-sync');
const UsuariosDAO = require('./DAOs/UsuariosDAO');
const PublicacionesDAO = require('./DAOs/PublicacionesDAO');
const mongoose = require('mongoose');

main();

async function main() {
    var respuesta;
    do {
        respuesta = readline.question("1. Menu usuarios\n2. Menu publicaciones\n0. Salir\nIngrese la entrada: ");
        var opcionMenu;
        if (respuesta == 1) {
            console.log();
            opcionMenu = parseInt(readline.question("1. Registrar usuario\n2. Editar usuario\n3. Iniciar sesion\n0. Salir\nIngrese la entrada: "));
            console.log();
            switch (opcionMenu) {
                case 1:
                    usuario = readline.question("Ingrese el nombre del usuario: ");
                    password = readline.question("Ingrese la password del usuario: ");
                    sexo = readline.question("Ingrese el sexo del usuario (masculino/femenino): ");
                    fechaNacimiento = readline.question("Ingrese la fecha de nacimiento del usuario (aaaa/mm/dd): ");
                    if (verificarFecha(fechaNacimiento)) {
                        usuarioNuevo = {
                            username: usuario,
                            contrasenia: password,
                            sexo: sexo,
                            fechaNacimiento: fechaNacimiento
                        }
                        try {
                            usuarioRegistrado = await UsuariosDAO.registrar(usuarioNuevo);
                            console.log("Usuario registrado correctamente");
                            console.log(usuarioRegistrado);
                        } catch (error) {
                            console.error(error);
                        }
                    } else {
                        console.log("La fecha esta en un formato invalido");
                    }
                    break;
                case 2:
                    usuario = readline.question("Ingrese el nombre del usuario a editar: ");
                    try {
                        usuarioExistente = await UsuariosDAO.obtenerPorUsername(usuario);
                        if (usuarioExistente != null) {
                            username = readline.question("Ingrese el nombre nuevo: ");
                            password = readline.question("Ingrese la password nueva: ");
                            sexo = readline.question("Ingrese el sexo del usuario (masculino/femenino): ");
                            fechaNacimiento = readline.question("Ingrese la fecha de nacimiento del usuario (aaaa/mm/dd): ");
                            usuarioExistente.username = username;
                            usuarioExistente.contrasenia = password;
                            usuarioExistente.sexo = sexo;
                            usuarioExistente.fechaNacimiento = fechaNacimiento;
                            usuarioActualizado = await UsuariosDAO.editar(usuarioExistente._id, usuarioExistente);
                            console.log("Usuario actualizado correctamente");
                        } else {
                            console.log("El usuario no existe");
                        }
                    } catch (error) {
                        console.error(error);
                    }
                    break;
                case 3:
                    usuario = readline.question("Ingrese el nombre del usuario: ");
                    password = readline.question("Ingrese la password del usuario: ");
                    try {
                        resultado = await UsuariosDAO.obtenerRegistrado(usuario, password);
                        if (resultado != null) {
                            console.log("Sesion iniciada correctamente");
                        } else {
                            console.log("No se encontro el usuario");
                        }
                    } catch (error) {
                        console.error(error);
                    }
                    break;
                default:
                    break;
            }
        } else if (respuesta == 2) {
            console.log();
            opcionMenu = parseInt(readline.question("1. Registrar publicacion\n2. Editar publicacion\n3. Eliminar publicacion\n4. Consultar publicaciones\n5. Registrar comentario\n6. Editar comentario\n7. Eliminar comentario\n0. Salir\nIngrese la entrada: "));
            console.log();
            var fechaActual= new Date();
            switch (opcionMenu) {
                case 1:
                    usuario= readline.question("Ingrese el nombre del usuario que registra la publicacion: ");
                    try{
                        usuarioExistente = await UsuariosDAO.obtenerPorUsername(usuario);
                        contenido= readline.question("Ingrese el contenido de la publicacion: ");
                        img= readline.question("Ingrese la url de la imagen: ");
                        publicacion= {
                            usuarioID: usuarioExistente._id,
                            fechaCreacion: fechaActual,
                            texto: contenido,
                            img: img
                        }
                        resultadoPublicacion= await PublicacionesDAO.registrar(publicacion);
                        console.log("Se ha registrado la publicacion");
                        console.log(resultadoPublicacion);
                    }catch(error){
                        console.error(error);
                    }
                    break;
                case 2:
                    console.log("2");
                    break;
                case 3:
                    console.log("3");
                    break;
                case 4:
                    try{
                        publicaciones= await PublicacionesDAO.obtenerTodas();
                        console.log("Publicaciones guardadas ");
                        console.log(publicaciones);
                    }catch(error){
                        console.error(error);
                    }
                    break;
                case 5:
                    contenido= readline.question("Ingrese el contenido de la publicacion al que agregara el comentario: ");
                    try{
                        publicacionExistente= await PublicacionesDAO.obtenerPorContenido(contenido);
                        usuario= readline.question("Ingrese el nombre del usuario que registra el comentario: ");
                        usuarioExistente = await UsuariosDAO.obtenerPorUsername(usuario);
                        contenido= readline.question("Ingrese el contenido del comentario: ");
                        img= readline.question("Ingrese la url del comentario: ");
                        comentario= {
                            usuarioID: usuarioExistente._id,
                            fechaCreacion: fechaActual,
                            texto: contenido,
                            img: img
                        }
                        resultadoComentario= await PublicacionesDAO.agregarComentario(publicacionExistente._id, comentario);
                        console.log("Se ha registrado el comentario");
                        console.log(resultadoComentario);
                    }catch(error){
                        console.error(error);
                    }
                    break;
                case 6:
                    console.log("6");
                    break;
                case 7:
                    console.log("7");
                    break;
                default:
                    break;
            }
        }
        console.log();
    } while (respuesta != 0);
    mongoose.connection.close();
}

function verificarFecha(texto) {
    const regex = /^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(texto);
}

