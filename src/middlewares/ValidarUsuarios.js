
class ValidarUsuario {

    static async validarRegistrarUsuario(req, res, next) {
        const { usertag, username, contrasenia, sexo, fechaNacimiento } = req.body;

        const camposEsperados = ['usertag', 'username', 'contrasenia', 'sexo', 'fechaNacimiento'];
        const camposEnviados = Object.keys(req.body);
        
        const camposAdicionales = camposEnviados.filter((campo) => !camposEsperados.includes(campo));
        
        if (camposAdicionales.length > 0) {
            return res.status(400).json({ error: `Campos no permitidos: ${camposAdicionales.join(', ')}` });
        }

        if (!usertag || !username || !contrasenia || !sexo || !fechaNacimiento) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (typeof usertag !== 'string' || typeof username !== 'string' || typeof contrasenia !== 'string' || typeof sexo !== 'string' || typeof fechaNacimiento !== 'string') {
            return res.status(400).json({ error: 'Verifica los datos de los campos' });
        }

        next();
    }

    static async validarInicioSesion(req, res, next) {
        const { username, contrasenia } = req.body;

        if (!username || !contrasenia) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (typeof username !== 'string' || typeof contrasenia !== 'string') {
            return res.status(400).json({ error: 'Verifica los datos de los campos' });
        }

        next();
    }

    static async validarEditarUsuario(req, res, next) {
        const { username, contrasenia, sexo, fechaNacimiento } = req.body;

        const camposEsperados = ['username', 'contrasenia', 'sexo', 'fechaNacimiento', "_id", "usertag"];
        const camposEnviados = Object.keys(req.body);

        const camposAdicionales = camposEnviados.filter((campo) => !camposEsperados.includes(campo));
        
        if (camposAdicionales.length > 0) {
            return res.status(400).json({ error: `Campos no permitidos: ${camposAdicionales.join(', ')}` });
        }

        if (!username || !contrasenia || !sexo || !fechaNacimiento) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        if (username && typeof username !== 'string') {
            return res.status(400).json({ error: 'El campo username debe ser una cadena de texto' });
        }
    
        if (contrasenia && typeof contrasenia !== 'string') {
            return res.status(400).json({ error: 'El campo contrasenia debe ser una cadena de texto' });
        }
    
        if (sexo && typeof sexo !== 'string') {
            return res.status(400).json({ error: 'El campo sexo debe ser una cadena de texto' });
        }
    
        if (fechaNacimiento && typeof fechaNacimiento !== 'string') {
            return res.status(400).json({ error: 'El campo fechaNacimiento ser una cadena de texto' });
        }
    
        next();
    }
}

module.exports = ValidarUsuario;