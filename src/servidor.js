const express= require('express');
require('dotenv').config();
const app= express();
const PORT= process.env.PORT;

app.use(express.json());

const routerAuth= require('./routers/RouterAuth');
app.use('/auth', routerAuth);

const routerUsuarios = require('./routers/RouterUsuarios');
app.use('/usuarios', routerUsuarios);

const routerPublicaciones = require('./routers/RouterPublicacion');
app.use('/publicaciones', routerPublicaciones);

const manejadorErrores= require('./middlewares/ManejadorErrores');
app.use(manejadorErrores);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});