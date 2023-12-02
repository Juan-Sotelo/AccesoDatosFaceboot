//Alex García, Juan Sotelo, Carlos Valle
const Publicacion = require('../models/Publicacion')

class PublicacionesDAO {

    static async registrar(publicacion) {
        try {
            const nuevaPublicacion = new Publicacion(publicacion)
            return await nuevaPublicacion.save();
        } catch (error) {
            throw error
        }
    }

    static async obtener(id) {
        try {
            const publicacion = await Publicacion.findOne({ _id: id })
            return publicacion;
        } catch (error) {
            throw error
        }
    }

    static async obtenerPorContenido(contenido) {
        try {
            const publicacion = await Publicacion.find({ texto: contenido });
            return publicacion;
        } catch (error) {
            throw error
        }
    }

    static async obtenerTodas() {
        try {
            const publicaciones = await Publicacion.find()
            return publicaciones;
        } catch (error) {
            throw error
        }
    }

    static async editar(id, publicacion) {
        try {
            const publicacionEditada = await Publicacion.findByIdAndUpdate(id, publicacion)
            return publicacionEditada;
        } catch (error) {
            throw error
        }
    }

    static async eliminar(id) {
        try {
            const publicacionEliminada = await Publicacion.findByIdAndRemove(id)
            return publicacionEliminada;
        } catch (error) {
            throw error
        }
    }

    static async agregarComentario(publicacionId, comentario) {
        try {
            const resultado = await Publicacion.findOneAndUpdate({
                _id: publicacionId
            },
                {
                    $push: { comentarios: comentario }
                },
                { new: true }
            );

            if (!resultado) {
                throw new Error('Publicacion no encontrada')
            }
            return resultado;

        } catch (error) {
            throw error
        }

    }

    static async editarComentario(publicacionId, comentarioId, comentario) {
        try {
            const resultado = await Publicacion.findOneAndUpdate({
                _id: publicacionId,
                'comentarios._id': comentarioId
            },
                {
                    $set: {
                        'comentarios.$.texto': comentario.texto,
                        'comentarios.$.img': comentario.img
                    }
                },
                { new: true }
            );

            if (!resultado) {
                throw new Error('Publicación o comentario no existe')
            }

            return resultado;

        } catch (error) {
            throw error;
        }

    }

    static async obtenerComentario(comentario) {
        try {
            const comentarios = await Publicacion.findOne({ 'comentarios': {$elemMatch: {'texto':comentario}} }, {'comentarios.$':1});
            return comentarios.comentarios[0];
        } catch (error) {
            throw error
        }
    }

    static async eliminarComentario(publicacionId, comentarioId) {
        console.log(publicacionId, comentarioId)
        try {
            const resultado = await Publicacion.findOneAndUpdate({
                _id: publicacionId,
            }, {
                $pull: { comentarios: { _id: comentarioId } }
            });
            console.log(resultado);
        } catch (error) {
            throw error
        }

    }

    static async consultaPaginadaPublicaciones(pagina){
        var porPagina= 3;
        var indiceInicio= (pagina-1)*porPagina;
        try{
            const resultado= await Publicacion.find({}).skip(indiceInicio).limit(porPagina);
            return resultado;
        } catch(error){
            throw error;
        }
    } 

    static async obtenerComentarioMasReciente(publicacionId) {
        try {
            const publicacion = await Publicacion.findById(publicacionId);
    
            if (!publicacion) {
                throw new Error('Publicación no encontrada');
            }
    
            // Ordenar los comentarios por fecha de creación de forma descendente
            const comentariosOrdenados = publicacion.comentarios.sort((a, b) => b.fechaCreacion - a.fechaCreacion);
    
            // Obtener el comentario más reciente (el primero después de ordenar)
            const comentarioMasReciente = comentariosOrdenados[0];
    
            return {
                publicacionId: publicacion._id,
                comentario: comentarioMasReciente
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PublicacionesDAO;