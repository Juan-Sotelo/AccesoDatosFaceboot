
class ValidarComentarios {

    static async validarCrearComentario(req, res, next) {
        const { texto, img, fechaCreacion } = req.body;

        const camposEsperados = ['texto', 'img', 'usertag', 'fechaCreacion'];
        const camposEnviados = Object.keys(req.body);
        
        const camposAdicionales = camposEnviados.filter((campo) => !camposEsperados.includes(campo));
        
        if (camposAdicionales.length > 0) {
            return res.status(400).json({ message: `Campos no permitidos: ${camposAdicionales.join(', ')}` });
        }

        if (!texto && !img) {
            return res.status(400).json({ message: 'Al menos uno de los campos debe estar presente para editar el comentario' });
        }

        if (texto && typeof texto !== 'string') {
            return res.status(400).json({ message: 'El campo texto debe ser una cadena de texto' });
        }

        if (img && typeof img !== 'string') {
            return res.status(400).json({ message: 'El campo img debe ser una cadena de texto' });
        }

        if (fechaCreacion && typeof fechaCreacion !== 'string') {
            return res.status(400).json({ message: 'El campo img debe ser una cadena de texto' });
        }
    
        next();
    }


    static async validarEditarComentario(req, res, next) {
        const { texto, img } = req.body;

        const { idPublicacion } = req.params.id.publicacionId;
        const { idComentario } = req.params.id.comentarioId;

        const camposEsperados = ['texto', 'img', 'usertag', 'fechaCreacion'];
        const camposEnviados = Object.keys(req.body);
        
        const camposAdicionales = camposEnviados.filter((campo) => !camposEsperados.includes(campo));
        
        if (camposAdicionales.length > 0) {
            return res.status(400).json({ message: `Campos no permitidos: ${camposAdicionales.join(', ')}` });
        }

        if (!idPublicacion) {
            return res.status(400).json({ message: 'Se debe proporcionar el id de la publicación' });
        }

        if (!idComentario) {
            return res.status(400).json({ message: 'Se debe proporcionar el id del comentario' });
        }

        if (!texto && !img) {
            return res.status(400).json({ message: 'Al menos uno de los campos (texto o img) debe estar presente para editar el comentario' });
        }

        if (texto && typeof texto !== 'string') {
            return res.status(400).json({ message: 'El campo texto debe ser una cadena de texto' });
        }

        if (img && typeof img !== 'string') {
            return res.status(400).json({ message: 'El campo img debe ser una cadena de texto' });
        }

        next();
    }

    static async validarEliminarComentario(req, res, next) {
        const { idPublicacion } = req.params.id.publicacionId;
        const { idComentario } = req.params.id.comentarioId;

        if (!idPublicacion) {
            return res.status(400).json({ message: 'Se debe proporcionar el id de la publicación' });
        }

        if (!idComentario) {
            return res.status(400).json({ message: 'Se debe proporcionar el id del comentario' });
        }

        next();
    }

}

module.exports = ValidarComentarios;

