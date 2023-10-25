const Publicacion = require('../models/Publicacion');
const PublicacionesDAO = require('../DAOs/PublicacionesDAO');
require('../database/database');


class ControladorPublicacion {
    static async addPublicacion(req, res) {
        try {

            const nuevaPublicacion = new Publicacion({
                usuarioID: req.user._id,
                fechaCreacion: new Date(),
                texto: req.body.texto,
                img: req.body.img,
                comentarios: []
            })

            const publicacionGuardada = await PublicacionesDAO.registrar(nuevaPublicacion);

            res.status(201).json(publicacionGuardada);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo añadir la publicación' })
        }
    }

    static async getPublicacion(req, res) {
        const publicacionId = req.params.id;

        try {
            const publicacion = await PublicacionesDAO.obtener(publicacionId);

            if (!publicacion) {
                return res.status(404).json({ error: 'ID de publicación no encontrada' });
            }
            res.json(publicacion);
        } catch (err) {
            res.status(500).json({ error: 'No se puede obtener la publicación' })
        }
    }

    static async getPublicacionContenido(req, res) {
        const contenido = req.body.texto;
        
        try {
            const publicacion = await PublicacionesDAO.obtenerPorContenido(contenido);

            if (!publicacion) {
                return res.status(404).json({ error: 'Publicación no encontrada' });
            }

            res.json(publicacion);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo obtener la publicación por contenido' });
        }
    }

    static async getAllPublicaciones(req, res) {
        try {
            const publicaciones = await PublicacionesDAO.obtenerTodas();
            res.json(publicaciones);
        } catch (err) {
            res.status(500).json({ error: 'No se pudieron obtener las publicaciones' })
        }
    }

    static async updatePublicacion(req, res) {
        const publicacionId = req.params.id;

        try {
            const publicacion = await PublicacionesDAO.obtener(publicacionId);

            if (!publicacion) {
                return res.status(404).json({ error: 'ID de publicación no encontrada' });
            }

            if (req.body.texto) {
                publicacion.texto = req.body.texto;
            }

            if (req.body.img) {
                publicacion.img = req.body.img;
            }

            const publicacionActualizada = await PublicacionesDAO.editar(publicacionId, publicacion);

            res.json(publicacionActualizada);
        } catch (err) {
            res.status(500).json({ error: 'No se pudo actualizar la publicación' });
        }
    }

    static async deletePublicacion(req, res) {
        const publicacionId = req.params.id;

        try {
            const publicacion = await PublicacionesDAO.obtener(publicacionId);

            if (!publicacion) {
                return res.status(404).json({ error: 'ID de publicación no encontrada' });
            }

            const publicacionEliminada = await PublicacionesDAO.eliminar(publicacionId);

            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'No se pudo eliminar la publicación' })
        }
    }

    static async addComentario(req, res) {
        const publicacionId = req.params.id;

        try {
            const publicacion = await PublicacionesDAO.obtener(publicacionId);

            if (!publicacion) {
                return res.status(404).json({ error: 'ID de publicación no encontrada' });
            }

            const comentarioNuevo = {
                fechaCreacion: new Date().toISOString(),
                texto: req.body.texto,
                img: req.body.img
            }

            const publicacionActualizada = await PublicacionesDAO.agregarComentario(publicacionId, comentarioNuevo);

            res.json(publicacionActualizada);
        } catch (err) {
            res.status(500).json({ error: 'No se pudo agregar el comentario' })
        }
    }

    static async updateComentario(req, res) {
        const publicacionId = req.params.publicacionId;
        const comentarioId = req.params.comentarioId;

        try {
            const publicacion = await PublicacionesDAO.obtener(publicacionId);

            if (!publicacion) {
                return res.status(404).json({ error: 'ID de publicación no encontrada' });
            }

            const comentario = {
                usuarioID: req.user._id,
                texto: req.body.texto,
                img: req.body.img
            }

            const comentarioActualizado = await PublicacionesDAO.editarComentario(publicacionId, comentarioId, comentario);

            if (!comentarioActualizado) {
                return res.status(404).json({ error: 'No se pudo encontrar el comentario' });
            }

            res.json(comentarioActualizado);

        } catch (err) {
            res.status(500).json({ error: 'No se pudo actualizar el comentario' });
        }
    }

    static async getComentario(req, res) {
        const contenido = req.body.texto;
        console.log(contenido)
        try {
            const comentario = await PublicacionesDAO.obtenerComentario(contenido);

            if (!comentario) {
                return res.status(404).json({ error: 'Comentario no encontrado' });
            }

            res.json(comentario);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo obtener el comentario por contenido' });
        }
    }

    static async deleteComentario(req, res) {
        const publicacionId = req.params.publicacionId;
        const comentarioId = req.params.comentarioId;

        try {
            const publicacion = await PublicacionesDAO.obtener(publicacionId);

            if (!publicacion) {
                return res.status(404).json({ error: 'ID de publicación no encontrada' });
            }

            const comentarioEliminado = await PublicacionesDAO.eliminarComentario(publicacionId, comentarioId);

            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'No se pudo eliminar el comentario' });
        }
    }

}

module.exports = ControladorPublicacion;