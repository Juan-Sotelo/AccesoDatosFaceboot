const express = require('express')
const router = express.Router();
const controladorPublicacion = require('../controllers/ControladorPublicacion')


router.post('/publicacion', controladorPublicacion.addPublicacion);
router.get('/publicacion/:id', controladorPublicacion.getPublicacion);
router.put('/editarPublicacion', controladorPublicacion.updatePublicacion); 
router.delete('/eliminarPublicacion', controladorPublicacion.deletePublicacion);
router.post('/comentario', controladorPublicacion.addComentario);
router.put('/editarComentario', controladorPublicacion.updateComentario);
router.delete('/eliminarComentario', controladorPublicacion.deleteComentario);
router.get('/comentario/:id', controladorPublicacion.getComentario);

module.exports = router;