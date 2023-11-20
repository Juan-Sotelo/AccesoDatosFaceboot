
class ValidarPublicaciones {

    static async validarCrearPublicacion(req, res, next) {
        const { texto, img, fechaCreacion } = req.body;

        const camposEsperados = ['texto', 'img', 'usertag', 'fechaCreacion'];
        const camposEnviados = Object.keys(req.body);
        
        const camposAdicionales = camposEnviados.filter((campo) => !camposEsperados.includes(campo));
        
        if (camposAdicionales.length > 0) {
            return res.status(400).json({ message: `Campos no permitidos: ${camposAdicionales.join(', ')}` });
        }
    
        if (!texto && !img) {
            return res.status(400).json({ message: 'Al menos uno de los campos debe estar presente para editar la publicación' });
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

    static async validarObtenerPorContenido(req, res, next) {
        const { texto } = req.body;

        
        if (!texto) {
            return res.status(400).json({ message: 'El campo texto es requerido' });
        }

        if (texto && typeof texto !== 'string') {
            return res.status(400).json({ message: 'El campo texto debe ser una cadena de texto' });
        }

        next();
    }

    static async validarEditarPublicacion(req, res, next) {
        const { texto, img } = req.body;
        const { id } = req.params.id;

        const camposEsperados = ['texto', 'img', 'usertag', 'fechaCreacion'];
        const camposEnviados = Object.keys(req.body);
        
        const camposAdicionales = camposEnviados.filter((campo) => !camposEsperados.includes(campo));
        
        if (camposAdicionales.length > 0) {
            return res.status(400).json({ message: `Campos no permitidos: ${camposAdicionales.join(', ')}` });
        }

        if (!id) {
            return res.status(400).json({ message: 'Se debe proporcionar el id' });
        }

        if (!texto && !img) {
            return res.status(400).json({ message: 'Al menos uno de los campos (texto o img) debe estar presente para editar la publicación' });
        }

        if (texto && typeof texto !== 'string') {
            return res.status(400).json({ message: 'El campo texto debe ser una cadena de texto' });
        }

        if (img && typeof img !== 'string') {
            return res.status(400).json({ message: 'El campo img debe ser una cadena de texto' });
        }

        next();
    }

    static async validarEliminarPublicacion(req, res, next) {
        const { id } = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Se debe proporcionar el id' });
        }
        next();
    }

}

module.exports = ValidarPublicaciones;