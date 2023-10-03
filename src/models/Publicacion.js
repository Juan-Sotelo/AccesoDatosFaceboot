const mongoose = require('mongoose')
const Usuario = require('./Usuario')

const Schema = mongoose.Schema

const comentarioSchema = new Schema ({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    usuarioID: {
        type: mongoose.Schema.Types.ObjectId,
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
})

const publicacionSchema = new Schema ({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    usuarioID: {
        type: mongoose.Schema.Types.ObjectId,
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
    },
    comentarios: [comentarioSchema] 
})

const Publicacion = mongoose.model('Publicacion', publicacionSchema)

module.exports = Publicacion;