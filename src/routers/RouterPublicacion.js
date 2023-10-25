const express = require('express')
const router = express.Router();
const controladorPublicacion = require('../controllers/ControladorPublicacion')

require('dotenv').config();
const jwt = require('jsonwebtoken');
const llave= process.env.LLAVE;

const verificarToken= (req, res, next)=>{
    const token= req.header('Authorization');

    if(!token){
        return res.status(401).json({error:'No se ha proporcionado el token'});
    }

    try{
        const tokenSinBearer= token.split(" ")[1];
        const decoded= jwt.verify(tokenSinBearer, llave);
        req.body.usertag = decoded.userId; 
        console.log(req.body);
        next();
    } catch(error){
        res.status(401).json({error: 'Token inválido'});
    }
};

router.post('/crear', verificarToken, controladorPublicacion.addPublicacion);
router.get('/:id', controladorPublicacion.getPublicacion);
router.get('/contenido', controladorPublicacion.getPublicacionContenido);
router.put('/:id', verificarToken, controladorPublicacion.updatePublicacion);
router.delete('/:id', verificarToken, controladorPublicacion.deletePublicacion);
router.get('/', controladorPublicacion.getAllPublicaciones);

router.put('/:id/comentario', verificarToken, controladorPublicacion.addComentario);
router.get('/comentario', controladorPublicacion.getComentario);
router.put('/:publicacionId/comentario/:comentarioId', verificarToken, controladorPublicacion.updateComentario);
router.delete('/:publicacionId/comentario/:comentarioId', verificarToken, controladorPublicacion.deleteComentario);

module.exports = router;