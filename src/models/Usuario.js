//Alex García, Juan Sotelo, Carlos Valle
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    usertag: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        enum: ['masculino','femenino'],
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    }
}, { versionKey: false });

usuarioSchema.methods.encriptarContrasenia = async function (contrasenia) {
   const salt = await bcrypt.genSalt(10)
   return await bcrypt.hash(contrasenia, salt)
}

usuarioSchema.methods.compararContrasenia = async function (contrasenia) {
    return await bcrypt.compare(contrasenia, this.contrasenia)
}

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario;