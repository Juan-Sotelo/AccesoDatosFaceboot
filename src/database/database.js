//Alex García, Juan Sotelo, Carlos Valle
const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://127.0.0.1/faceboot'

mongoose.connect(MONGO_URI)

mongoose.connection.on('open', _ => {

})