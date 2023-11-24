const express= require('express');
require('dotenv').config();
const app= express();
const PORT= process.env.PORT;
const cors = require('cors');

app.use(express.json());
// app.use(cors({
//     origin: `http://localhost:5500`,
//     credentials: true
// }));
app.use(cors());

const routerAuth= require('./routers/RouterAuth');
app.use('/auth', routerAuth);

const routerUsuarios = require('./routers/RouterUsuarios');
app.use('/api/v2/usuario', routerUsuarios);

const routerPublicaciones = require('./routers/RouterPublicacion');
app.use('/api/v2/publicacion', routerPublicaciones);

const manejadorErrores= require('./middlewares/ManejadorErrores');
app.use(manejadorErrores);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});