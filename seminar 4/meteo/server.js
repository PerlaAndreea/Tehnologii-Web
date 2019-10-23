'use strict'

const express = require('express')
const request = require('request-promise')
const proxiedRequest = request.defaults({
    proxy : 'http://cache.ase.ro:8080'
})

const app = express()
app.locals.cache = null

app.get('/weather', async (req, res) => {
    try {
        if (!app.locals.cache) {
            let response = await proxiedRequest('http://www.meteoromania.ro/wp-json/meteoapi/v2/starea-vremii')
            app.locals.cache = JSON.parse(response)

        }

        // GET hhtp://localhost:8080/weather?city=iasi
        let city = req.query.city
        let weatherRecord = app.locals.cache.features.find((e) => e.properties.nume === city.toUpperCase())

        if (weatherRecord) {
            res.status(200).json(weatherRecord)
        } else {
            res.status(404).json({message : 'not found try another'})
        }

    } catch(err) {
        console.warn(err)
        res.status(500).json({message : ':('})
    }
})

app.listen(8080)