const express= require('express');
const app= express();
const port= 2222;

app.use(express.json());

const routerAuth= require('./routers/RouterAuth');
app.use('/auth', routerAuth);

const routerUsuarios = require('./routers/RouterUsuarios');
app.use('/usuarios', routerUsuarios);

const routerPublicaciones = require('./routers/RouterPublicacion');
app.use('/publicaciones', routerPublicaciones);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ocurrió un error en el servidor');
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});