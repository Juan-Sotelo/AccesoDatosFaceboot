const express = require('express')
const router = express.Router();
const controladorPublicacion = require('../controllers/ControladorPublicacion')


router.post('/publicacion', controladorPublicacion.addPublicacion);
router.get('/publicacion/:id', controladorPublicacion.getPublicacion);

module.exports = router;