const express= require('express');
// const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');

require('dotenv').config();
const PORT= process.env.PORT;
// const PORTWS= process.env.PORTWS;

const app= express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//       origin: 'http://127.0.0.1:5500', 
//       methods: ['GET', 'POST'],
//     },
// });
// //const io= socketIo(server);
// io.on('connection', (socket) => {
//     console.log("Se ha conectado por web socket un cliente");
// });

app.use(express.json());

app.use(cors());

const routerAuth= require('./routers/RouterAuth');
app.use('/auth', routerAuth);

const routerUsuarios = require('./routers/RouterUsuarios');
app.use('/api/v2/usuario', routerUsuarios);

const routerPublicaciones = require('./routers/RouterPublicacion');
app.use('/api/v2/publicacion', routerPublicaciones);
// app.use('/api/v2/publicacion', (req, res, next) => {
//     if (req.method==="GET") {
//         io.emit('publicacionCreada', {mensaje: res.json});
//     }
// });

const manejadorErrores= require('./middlewares/ManejadorErrores');
app.use(manejadorErrores);


// io.on('connection', (socket) => {
//     console.log('Usuario conectado');
  
//     // Manejar eventos de Socket.io aquí
  
//     socket.on('disconnect', () => {
//       console.log('Usuario desconectado');
//     });

//     socket.on('chat message', (msg) => {
//         console.log('message' + msg);
//         io.emit('chat message',msg)
//     })
//   });

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

// server.listen(PORTWS, ()=> {
//     console.log("WebSocket escuchando en el puerto: "+PORTWS);
// });