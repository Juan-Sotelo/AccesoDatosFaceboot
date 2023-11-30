const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const PORTWS= process.env.PORTWS;
const app= express();
app.use(cors());
app.use(express.json());
const server = http.createServer();
const io = socketIo(server, {
    cors: {
      origin: 'http://127.0.0.1:5500', 
      methods: ['GET', 'POST'],
    },
});

const router = express.Router();
const controladorPublicacion = require('../controllers/ControladorPublicacion')
const validarPublicaciones = require('../middlewares/ValidarPublicaciones')

//require('dotenv').config();
const jwt = require('jsonwebtoken');
const { validarCrearComentario } = require('../middlewares/ValidarComentarios');
const ValidarComentarios = require('../middlewares/ValidarComentarios');
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

io.on('connection', (socket) => {
    console.log("Se ha conectado por web socket un cliente");
});

server.listen(PORTWS, ()=> {
    console.log("WebSocket escuchando en el puerto: "+PORTWS);
});

router.post('/crear', verificarToken, validarPublicaciones.validarCrearPublicacion ,controladorPublicacion.addPublicacion);
router.get('/:id', controladorPublicacion.getPublicacion);
router.post('/search/contenido',  validarPublicaciones.validarObtenerPorContenido,controladorPublicacion.getPublicacionContenido);
router.put('/:id', verificarToken, validarPublicaciones.validarEditarPublicacion, controladorPublicacion.updatePublicacion);
router.delete('/:id', verificarToken, controladorPublicacion.deletePublicacion);
router.get('/', controladorPublicacion.getAllPublicaciones);
router.get('/:id/nuevo', controladorPublicacion.obtenerComentarioMasReciente);
router.get('/paginada/:indice', controladorPublicacion.getPublicacionesPaginadas, (req, res)=>{
    io.emit('publicacionCreada', {mensaje: 'Publicación con id: '+req.params.indice+" actualizada"});
});

router.put('/:id/comentario', verificarToken, ValidarComentarios.validarCrearComentario, controladorPublicacion.addComentario, (req, res)=> {
 
        io.emit('comentarioAgregado', {idPublicacion: req.params.id});
    
});
router.get('/comentario', controladorPublicacion.getComentario);
router.put('/:publicacionId/comentario/:comentarioId', ValidarComentarios.validarEditarComentario, verificarToken, controladorPublicacion.updateComentario, (req, res)=> {
   
        const { comentarioId } = req.params;
        const { texto, img } = req.body;
        console.log(texto, img)
        io.emit('comentarioEditado', {
            idComentario: comentarioId,
            nuevoTexto: texto,
            nuevaImagen: img
        });
  
});
router.delete('/:publicacionId/comentario/:comentarioId', verificarToken, ValidarComentarios.validarEliminarComentario, controladorPublicacion.deleteComentario, (req, res)=> {
   
        io.emit('comentarioEliminado', {idComentario: req.params.comentarioId});

});

module.exports = router;