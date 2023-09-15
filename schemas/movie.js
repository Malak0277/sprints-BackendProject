const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({

    name: {type: String, required: true},
    director: {type: String, required: true},
    actors: {type: [String], required: true},
    releaseYear: {type: Number, required: true},
    imdb: {type: Number, required: true},
    runTime: {type: Number, required: true}

})

// model 
const Movies = mongoose.model('movie', movieSchema)

module.exports = Movies