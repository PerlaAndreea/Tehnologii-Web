'use strict'
const express = require('express') // cauta un director numit express in node modules si citeste un index.js -> imi returneaza un modul expres
const bodyParser = require("body-parser")
const app = express()

app.locals.kittens = [{name : 'tim', color : 'orange'}]
app.use((req, res, next) => {
    console.warn(req.url)
    next() //un middleware care nu face nimic => nici nu afecteaza starea aplicatiei
})

app.use(bodyParser.json())

let statusRouter = require('./routers/status-router')
let kittenRouter = require('./routers/kitten-router')

app.use('/status', statusRouter)
app.use('/kitten-api', kittenRouter)

app.listen(8080)