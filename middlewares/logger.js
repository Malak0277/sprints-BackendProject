const fs = require('fs')

const logger = (req, res, next) => {
    const method = req.method
    const route = req.path
    const time = new Date()
    
    fs.writeFile('log.txt', `${method} ${route} ${time}\n`, {encoding: "utf-8", flag: 'a'}, (err) => {
        if (err) {
            console.log(err)
        }else {
            console.log("File is written successfully")
        }
    })
    
    
    next()
}

module.exports = logger