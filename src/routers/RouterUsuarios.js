const express = require('express');
const router = express.Router();
const controladorUsuarios = require('../controllers/ControladorUsuarios');

// Rutas
router.post('/iniciarSesion', (req, res)=>{
    return controladorUsuarios.iniciarSesion(req.body.username, req.body.contrasenia)
    .then(resultado =>{
        res.json(resultado);
    })
    .catch(error=> {
        res.status(500).json({error:error});
    })
});
router.put('/registrarUsuario', (req, res)=>{
    return controladorUsuarios.registrarUsuario(req.body)
    .then(resultado =>{
        res.json(resultado);
    })
    .catch(error=>{
        res.status(500).json({error:error});
    })
});
router.post('/editarUsuario', (req, res)=>{
    usuarioNuevo= {
        username: req.body.username,
        contrasenia: req.body.contrasenia,
        sexo: req.body.sexo,
        fechaNacimiento: req.body.fechaNacimiento
    }
    return controladorUsuarios.actualizarUsuario(req.body.usernameActual, usuarioNuevo)
    .then(resultado=>{
        res.json(resultado);
    })
    .catch(error=>{
        res.status(500).json({error:error});
    })
});
router.delete('/eliminarUsuario', (req, res)=>{
    return controladorUsuarios.eliminarUsuario(req.body.username)
    .then(resultado=>{
        res.json(resultado);
    })
    .catch(error=>{
        res.status(500).json({error:error});
    })
})

module.exports = router;