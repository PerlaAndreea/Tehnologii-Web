const express = require('express')

//console.log(express)

const app = express()

app.use(express.static('public'))


app.get('/ping', (req, res) => {
    res.send('pong')
})

app.get('/p*', (req, res) => {
    res.send('p*')
})

app.listen(8080)