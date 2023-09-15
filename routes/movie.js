const express = require("express")
const Movies = require("../schemas/movie")


const router = express.Router()


router.get('/', async(req, res) => {
    const movies = await Movies.find({})
    res.send(movies)
})

router.post('/', async(req, res) => {
    try{
        const body = req.body

        const newMovie = new Movies ({
            name: body.name,
            director: body.director,
            actors: body.actors,
            imdb: body.imdb,
            releaseYear: body.releaseYear,
            runTime: body.runTime,
        })

        const check1 = await Movies.findOne({'name': body.name})
        const check2 = await Movies.findOne({'director': body.director})
        const check3 = await Movies.findOne({'releaseYear': body.releaseYear})
        const check4 = await Movies.findOne({'imdb': body.imdb})
        
        if(check1 && check2 && check3 && check4){
            res.send("Movie already exists !")
            
        }else{
            await newMovie.save()   
            res.send(newMovie)
        }
    }catch(e){
        console.log(e)
        res.send("There is something wrong with your input\n It should look like this\n{\n\"name\": ...,\n\"director\": ...,\n\"actors\": ...,\n\"releaseYear\": ...,\n\"imdb\": ...,\n\"runTime\": ...\n}")
    }
})

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const body = req.body

        if(!id){
            res.send({error: true, message: "id is not defined"})
            return
        }

        const movie = await Movies.findOneAndUpdate({_id: id}, {...body}, {new: true})
        res.send(movie)
    }catch(e){
        res.send("There is no such id in the system")
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id

        if(!id){
            res.send({error: true, message: "id is not defined"})
            return
        }

        const result = await Movies.findByIdAndDelete(id)
        res.send(result)
    }catch(e){
        res.send("There is no such id in the system")
    }
})


module.exports = router