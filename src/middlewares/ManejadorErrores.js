module.exports = (err, req, res, next) => {
    if(err instanceof SyntaxError){
        res.status(400).send('Error en la sintaxis de la petición')
    }else{
        res.status(500).send('Ocurrió un error en el servidor');
    }
};