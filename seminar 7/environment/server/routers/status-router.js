const express = require('express')

let router = express.Router()

module.exports = router

router.get('/ping', (req, res) => {
    res.status(200).json({message: 'i am still alive'})
})
