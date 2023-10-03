const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://127.0.0.1/faceboot'

mongoose.connect(MONGO_URI)

mongoose.connection.on('open', _ => {
    console.log("¡ Se conectó !")
})