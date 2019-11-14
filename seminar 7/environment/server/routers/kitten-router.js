const express = require('express')

let router = express.Router()

module.exports = router

router.get('/kittens', (req, res) => {
    res.status(200).json(res.app.locals.kittens)
})

router.post('/kittens', (req, res)=> {
    let kitten = req.body
    res.app.locals.kittens.push(kitten)
    res.status(201).json({message : 'created'})
    
})

router.delete('/kittens/:name', (req, res) => {
    let kittenName = req.params.name
    let kittenIndex = res.app.locals.kittens.findIndex((e) => e.name === kittenName)
    
    if (kittenIndex === -1) {
        res.status(404).json({message : 'not found'})
    } else {
        res.app.locals.kittens.splice(kittenIndex, 1)
        res.status(202).json({message: 'accepted'})
    }
})

module.exports = router;