const express= require('express');
const app= express();
const port= 2222;

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ocurrió un error en el servidor');
});

const routerUsuarios = require('./routers/RouterUsuarios');
app.use('/usuarios', routerUsuarios);

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});