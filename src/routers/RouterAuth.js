const express = require('express');
require('dotenv').config();
const router = express.Router();
const controladorUsuarios = require('../controllers/ControladorUsuarios');
const validarUsuarios = require('../middlewares/ValidarUsuarios');
const jwt = require('jsonwebtoken');
const llave= process.env.LLAVE;

// Rutas
router.post('/iniciarSesion', validarUsuarios.validarInicioSesion, (req, res)=>{
    return controladorUsuarios.iniciarSesion(req.body.username, req.body.contrasenia)
    .then(resultado =>{
        if(!resultado || resultado.contrasenia!=req.body.contrasenia){
            res.status(401).json({error:'Credenciales inválidas'});
        }else{
            const expiresIn= '1h';
            const token= jwt.sign({userId:resultado.usertag, 
                username:resultado.username, 
                contrasenia:resultado.contrasenia, 
                sexo:resultado.sexo, 
                fechaNacimiento:resultado.fechaNacimiento},llave,{expiresIn});
            res.json(token);
        }
    })
    .catch(error=> {
        res.status(500).json({error:error});
    })
});


module.exports = router;