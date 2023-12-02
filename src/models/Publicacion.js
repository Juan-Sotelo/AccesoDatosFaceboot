//Alex García, Juan Sotelo, Carlos Valle
const mongoose = require('mongoose')
const Usuario = require('./Usuario')

const Schema = mongoose.Schema

const comentarioSchema = new Schema ({
    usertag: {
        type: String,
        ref: Usuario,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    }
}, { versionKey: false })

const publicacionSchema = new Schema ({
    usertag: {
        type: String,
        ref: Usuario,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    texto: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    comentarios: [comentarioSchema] 
}, { versionKey: false })

const Publicacion = mongoose.model('Publicacion', publicacionSchema)

module.exports = Publicacion;