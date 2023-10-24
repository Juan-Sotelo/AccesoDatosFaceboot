const express = require('express')
const router = express.Router();
const publicacionController = require('../controllers/ControladorPublicacion')


router.post('/publicacion', publicacionController.addPublicacion);
router.get('/publicacion/:id', publicacionController.getPublicacion);