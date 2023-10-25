const express = require('express');
require('dotenv').config();
const router = express.Router();
const controladorUsuarios = require('../controllers/ControladorUsuarios');
const jwt = require('jsonwebtoken');
const llave= process.env.LLAVE;

// Rutas
router.post('/iniciarSesion', (req, res)=>{

    return controladorUsuarios.loginUsuario(req, res)
    .then(resultado =>{
        res.json(resultado);
        if(!resultado || resultado.contrasenia!=req.body.contrasenia){
            console.log('Credenciales inválidas.');
            res.status(401).json({error:'Credenciales inválidas'});
        }else{
            const expiresIn= '1h';
            const token= jwt.sign({userId:resultado._id},llave,{expiresIn});
            console.log(resultado);
            res.json(token);
        }
    })
    .catch(error=> {
        console.error('Error en el bloque catch:', error);
        res.status(500).json({error: 'Error jijiji'});
    })
});

module.exports = router;