require('dotenv').config() 
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./middlewares/logger')

const movieRouter = require('./routes/movie')

const app = express()

const PORT = process.env.PORT || 3010


app.use(express.urlencoded({extended: true}))
app.use(express.json())

//connecting to the db
mongoose
    .connect(process.env.CONNECTION_STRING, {})
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((e) => {
        console.log(e)
    })


//middleware -Routes
app.use(logger)
app.use('/movie', movieRouter)





app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})