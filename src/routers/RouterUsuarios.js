const express = require('express');
require('dotenv').config();
const router = express.Router();
const controladorUsuarios = require('../controllers/ControladorUsuarios');
const validarUsuarios = require('../middlewares/ValidarUsuarios');
const jwt = require('jsonwebtoken');
const llave= process.env.LLAVE;

// Rutas
const verificarToken= (req, res, next)=>{
    const token= req.header('Authorization');

    if(!token){
        return res.status(401).json({error:'No se ha proporcionado el token'});
    }

    try{
        const tokenSinBearer= token.split(" ")[1];
        const decoded= jwt.verify(tokenSinBearer, llave);
        
        console.log(req.body.usertag);
        console.log(decoded.userId);
        if(req.body.usertag !== decoded.userId && req.query.usertag !== decoded.userId){
            return res.status(401).json({error: 'Usuario del token diferente al de la solicitud'});
        }
        next();
    } catch(error){
        res.status(401).json({error: 'Token inválido'});
    }
};

router.post('/', validarUsuarios.validarRegistrarUsuario, controladorUsuarios.addUsuario);
router.put('/editar',verificarToken, validarUsuarios.validarEditarUsuario, controladorUsuarios.updateUsuario);
router.get('/',verificarToken, controladorUsuarios.obtenerUsuario)

module.exports = router;