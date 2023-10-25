const express = require('express');
require('dotenv').config();
const router = express.Router();
const controladorUsuarios = require('../controllers/ControladorUsuarios');
const jwt = require('jsonwebtoken');
const llave= process.env.LLAVE;

// Rutas
router.post('/iniciarSesion', (req, res)=>{
    return controladorUsuarios.iniciarSesion(req.body.username, req.body.contrasenia)
    .then(resultado =>{
        console.log(resultado);
        if(!resultado || resultado.contrasenia!=req.body.contrasenia){
            res.status(401).json({error:'Credenciales inválidas'});
        }else{
            const expiresIn= '1h';
            const token= jwt.sign({userId:resultado._id},llave,{expiresIn});
            console.log(resultado);
            res.json(token);
        }
    })
    .catch(error=> {
        res.status(500).json({error:error});
    })
});


module.exports = router;