const express = require('express');
require('dotenv').config();
const router = express.Router();
const controladorUsuarios = require('../controllers/ControladorUsuarios');
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
        if(req.body._id!=decoded.userId){
            return res.status(401).json({error: 'Usuario del token diferente al de la solicitud'});
        }
        next();
    } catch(error){
        res.status(401).json({error: 'Token inválido'});
    }
};

router.post('/registrarUsuario', controladorUsuarios.addUsuario);
router.put('/editar',verificarToken, controladorUsuarios.updateUsuario);

module.exports = router;